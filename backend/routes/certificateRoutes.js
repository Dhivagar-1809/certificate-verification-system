import express from 'express';
const router = express.Router();
import {
    issueCertificate,
    verifyCertificate,
    getCertificates,
    getMyCertificates
} from '../controllers/certificateController.js';
import { protect, admin } from '../middleware/auth.js';

router.route('/').get(protect, admin, getCertificates);
router.route('/my').get(protect, getMyCertificates);
router.route('/issue').post(protect, admin, issueCertificate);
router.route('/verify').post(verifyCertificate); // Public verification

export default router;
