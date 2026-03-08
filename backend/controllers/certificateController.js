import crypto from 'crypto';
import Certificate from '../models/Certificate.js';
import VerificationLog from '../models/VerificationLog.js';
import { web3, getContract } from '../utils/blockchain.js';

// @desc    Issue a new certificate
// @route   POST /api/certificates/issue
// @access  Private/Admin
const issueCertificate = async (req, res) => {
    const { student_name, student_email, course, university, issue_date } = req.body;

    try {
        // 1. Generate unique certificate ID
        const certificate_id = crypto.randomBytes(16).toString('hex');

        // 2. Prepare data for hashing
        const certificateData = JSON.stringify({
            student_name,
            course,
            university,
            issue_date,
        });

        // 3. Generate SHA256 hash
        const certificate_hash = crypto.createHash('sha256').update(certificateData).digest('hex');

        // 4. Store hash in blockchain
        const contract = getContract();
        const accounts = await web3.eth.getAccounts();
        
        // Use first account as admin for Ganache deployment
        const adminAccount = accounts[0]; 

        // Estimate gas
        const gasEstimate = await contract.methods.issueCertificate(certificate_id, certificate_hash).estimateGas({ from: adminAccount });

        // Send transaction
        const receipt = await contract.methods.issueCertificate(certificate_id, certificate_hash).send({
            from: adminAccount,
            gas: gasEstimate
        });

        const blockchain_txn = receipt.transactionHash;

        // 5. Save in MongoDB
        const certificate = await Certificate.create({
            certificate_id,
            student_name,
            student_email,
            course,
            university,
            issue_date,
            certificate_hash,
            blockchain_txn,
            issued_by: req.user._id
        });

        res.status(201).json(certificate);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Error issuing certificate' });
    }
};

// @desc    Verify a certificate
// @route   POST /api/certificates/verify
// @access  Public
const verifyCertificate = async (req, res) => {
    const { certificate_id, data_to_verify } = req.body;
    
    // data_to_verify could be provided to re-hash, or we just rely on ID to check DB and match Blockchain
    
    try {
        // Find in MongoDB
        const certificate = await Certificate.findOne({ certificate_id });
        
        if (!certificate) {
            // Log failed verification
            await VerificationLog.create({
                certificate_id,
                verified_by: req.user ? req.user._id : null,
                status: 'FAKE'
            });
            return res.status(404).json({ message: 'Certificate not found in database', status: 'FAKE CERTIFICATE' });
        }

        // Fetch from blockchain
        const contract = getContract();
        let blockchainHash;
        try {
            blockchainHash = await contract.methods.verifyCertificate(certificate_id).call();
        } catch (err) {
            await VerificationLog.create({
                certificate_id,
                verified_by: req.user ? req.user._id : null,
                status: 'FAKE'
            });
            return res.status(400).json({ message: 'Certificate not found on blockchain', status: 'FAKE CERTIFICATE' });
        }

        // Compare Hashes
        if (blockchainHash === certificate.certificate_hash) {
            // Log success verification
            await VerificationLog.create({
                certificate_id,
                verified_by: req.user ? req.user._id : null,
                status: 'VALID'
            });
            
            return res.status(200).json({ 
                message: 'Certificate is valid and untampered', 
                status: 'VALID CERTIFICATE',
                certificate: {
                    student_name: certificate.student_name,
                    course: certificate.course,
                    university: certificate.university,
                    issue_date: certificate.issue_date,
                    blockchain_txn: certificate.blockchain_txn
                }
            });
        } else {
             // Log failed verification
             await VerificationLog.create({
                certificate_id,
                verified_by: req.user ? req.user._id : null,
                status: 'FAKE'
            });
            return res.status(400).json({ message: 'Certificate data mismatch! Potential tampering detected.', status: 'FAKE CERTIFICATE' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error verifying certificate' });
    }
};

// @desc    Get all certificates
// @route   GET /api/certificates
// @access  Private/Admin
const getCertificates = async (req, res) => {
    const certificates = await Certificate.find({}).sort({ createdAt: -1 });
    res.json(certificates);
};

// @desc    Get my certificates
// @route   GET /api/certificates/my
// @access  Private/Student
const getMyCertificates = async (req, res) => {
    // Basic implementation relies on email match. In prod, link user_id explicitly when issuing.
    const certificates = await Certificate.find({ student_email: req.user.email }).sort({ createdAt: -1 });
    res.json(certificates);
};

export { issueCertificate, verifyCertificate, getCertificates, getMyCertificates };
