# Secure Academic Certificate Verification System

A full-stack Web3 application that allows universities to issue verifiable, tamper-proof academic certificates on the Ethereum blockchain, and enables recruiters to verify them instantly.

## 🚀 Tech Stack
- **Frontend**: React.js, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js, MongoDB
- **Blockchain**: Solidity, Ethereum, Web3.js, Truffle

## 📋 Features
- **3 User Roles**: Admin (University), Student, Recruiter
- **Admin Dashboard**: Issue certificates to the blockchain and view analytics
- **Student Dashboard**: View personal certificates, download as PDF, share via QR code
- **Recruiter Dashboard / Public Portal**: Verify certificates using unique IDs linked to blockchain transaction hashes
- **Tamper-Proof System**: Uses SHA-256 hashing to map certificate data to the smart contract
- **Modern UI**: Stunning glassmorphism design with responsive gradients and animations

---

## 🛠 Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB running locally or a MongoDB Atlas URI
- Truffle CLI (`npm i -g truffle`)
- Ganache UI or Ganache CLI for local blockchain

### 1. Blockchain Setup
1. Open Ganache and start a workspace on port `7545`
2. Navigate to the `blockchain` directory:
   ```bash
   cd blockchain
   npm install
   ```
3. Compile and deploy the smart contract to Ganache:
   ```bash
   truffle compile
   truffle migrate --reset
   ```
4. Find the deployed contract address in the terminal output (e.g., `0x123abc...`) and save it for the next step.

### 2. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   npm install
   ```
2. Open `backend/.env` and update the `CONTRACT_ADDRESS` with the address from step 1:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/secure_cert_db
   JWT_SECRET=supersecretblockchainkey
   RPC_URL=http://127.0.0.1:7545
   CONTRACT_ADDRESS=your_deployed_contract_address_here
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   npm install
   ```
2. Start the Vite React app:
   ```bash
   npm run dev
   ```
3. Open http://localhost:5173 in your browser.

---

## 👨‍💻 Usage Flow for Demonstration

1. **Register as Admin**: Create a new account and select the "Admin" role.
2. **Issue Certificate**: Go to the Admin Dashboard and issue a certificate for a student (e.g. John Doe).
3. **Check Blockchain**: See the transaction go through Ganache.
4. **Register as Student**: Create an account with the "Student" role using the email you just issued the certificate to.
5. **View Certificate**: Open the Student Dashboard to view the newly minted certificate and its QR code/transaction ID.
6. **Verify**: Copy the generated Certificate ID and paste it into the "Verify" page to see the blockchain confirmation.

## 🔒 Security Logic Explained
1. Application compiles student name, course, university, and date into a JSON string.
2. Creates a SHA-256 hash of this data.
3. This unique hash and unique ID is stored publicly but anonymously on the Ethereum Ledger.
4. When a recruiter queries the ID, the system checks if the hash on the blockchain matches the hash generated from the database record. If it perfectly matches, the certificate is authentic and untampered!
