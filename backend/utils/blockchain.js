import Web3 from 'web3';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Replace with your Ganache RPC URL
const rpcURL = process.env.RPC_URL || 'http://127.0.0.1:7545';
const web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));

let contractABI = [];
let contractAddress = process.env.CONTRACT_ADDRESS || '';

// Load contract artifacts after deployment
try {
    const artifactPath = path.resolve(__dirname, '../../blockchain/build/contracts/CertificateVerifier.json');
    if (fs.existsSync(artifactPath)) {
        const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
        contractABI = artifact.abi;
        const networkId = Object.keys(artifact.networks)[0];
        if (networkId && !contractAddress) {
            contractAddress = artifact.networks[networkId].address;
        }
    } else {
        console.warn('⚠️ Blockchain contract artifact not found. Make sure to compile and migrate Truffle contracts.');
    }
} catch (error) {
    console.error('Error loading contract artifact:', error);
}

const getContract = () => {
    if (!contractABI.length || !contractAddress) {
        throw new Error('Contract not properly initialized.');
    }
    return new web3.eth.Contract(contractABI, contractAddress);
};

export { web3, getContract };
