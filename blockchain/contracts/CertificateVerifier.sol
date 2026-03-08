// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CertificateVerifier {
    
    // Admin address who deploys the contract and is authorized to issue certificates
    address public admin;

    // Mapping from a unique string certificate ID to its generated SHA256 hash
    mapping(string => string) private certificateHashes;
    
    // Mapping to track existance of an ID
    mapping(string => bool) private certificateExists;

    // Event emitted when a new certificate is issued
    event CertificateIssued(string certificateID, string certificateHash);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    /**
     * @dev Issues a new certificate by storing its hash on the blockchain.
     * @param _certificateID Unique identifier for the certificate.
     * @param _certificateHash The SHA256 hash of the certificate details.
     */
    function issueCertificate(string memory _certificateID, string memory _certificateHash) public onlyAdmin {
        require(bytes(_certificateID).length > 0, "Certificate ID cannot be empty");
        require(bytes(_certificateHash).length > 0, "Certificate hash cannot be empty");
        require(!certificateExists[_certificateID], "Certificate with this ID already exists");

        // Store the hash
        certificateHashes[_certificateID] = _certificateHash;
        certificateExists[_certificateID] = true;

        emit CertificateIssued(_certificateID, _certificateHash);
    }

    /**
     * @dev Verifies a certificate by returning the stored hash for a given ID.
     * @param _certificateID Unique identifier for the certificate.
     * @return The SHA256 hash of the certificate if it exists.
     */
    function verifyCertificate(string memory _certificateID) public view returns (string memory) {
        require(certificateExists[_certificateID], "Certificate does not exist");
        return certificateHashes[_certificateID];
    }
}
