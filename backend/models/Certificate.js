import mongoose from 'mongoose';

const certificateSchema = mongoose.Schema(
    {
        certificate_id: {
            type: String,
            required: true,
            unique: true,
        },
        student_name: {
            type: String,
            required: true,
        },
        student_email: {
            type: String,
            required: true,
        },
        course: {
            type: String,
            required: true,
        },
        university: {
            type: String,
            required: true,
        },
        issue_date: {
            type: Date,
            required: true,
        },
        certificate_hash: {
            type: String,
            required: true,
        },
        blockchain_txn: {
            type: String,
            required: true,
        },
        issued_by: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;
