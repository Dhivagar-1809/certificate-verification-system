import mongoose from 'mongoose';

const verificationLogSchema = mongoose.Schema(
    {
        certificate_id: {
            type: String,
            required: true,
        },
        verified_by: {
            type: mongoose.Schema.Types.ObjectId,
            required: false, // Could be guest/anonymous
            ref: 'User',
        },
        status: {
            type: String,
            enum: ['VALID', 'FAKE'],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const VerificationLog = mongoose.model('VerificationLog', verificationLogSchema);

export default VerificationLog;
