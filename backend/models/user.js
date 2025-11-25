import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber:{
        type: String,
        required: true  
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    role: {
        type: String,
        enum: ['applicant', 'recruiter'],
        required: true
    },
    profile:{
        bio: { type: String },
        skills:[{ type: String }],
        resume:{ type: String },// URL or file path to the resume,
        resumeOriginalName:{ type: String },
        companyName:{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        profilePhoto:{
            type: String,
            default:""
        }
    },

}, { timestamps: true });
export const User=mongoose.model('User', userSchema);
