import { Job } from "../models/job.js";
import mongoose from 'mongoose';
export const postJob = async (req, res) => {
    try {
        // Job posting logic here
    const {title, description, requirements, location, salary, jobType, experience, position, companyId} = req.body; 
        const userId = req.id; // Extracted from isauth middleware

        if(!title || !description || !requirements || !location || !salary || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        };
        // normalize requirements: accept an array or a comma-separated string
        let requirementsArray = [];
        if (Array.isArray(requirements)) {
            requirementsArray = requirements.map(r => String(r).trim()).filter(Boolean);
        } else if (typeof requirements === 'string') {
            requirementsArray = requirements.split(',').map(r => r.trim()).filter(Boolean);
        }

        // Normalize jobType to match enum values (capitalize first letter)
        const jobTypeMap = {
            'full-time': 'Full-time',
            'part-time': 'Part-time',
            'contract': 'Contract',
            'internship': 'Internship',
            'full time': 'Full-time',
            'part time': 'Part-time'
        };
        const normalizedJobType = jobTypeMap[jobType.toLowerCase()] || jobType;

        const job = await Job.create({
            title,
            description,
            requirements: requirementsArray,
            location,
            salary: Number(salary),
            jobType: normalizedJobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "Job posted successfully",
            job,
            success: true,
        });
    } catch (error) {
        console.error("Error in posting job:", error);
        
        // Handle validation errors specifically
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                message: messages.join(', '),
                success: false,
            });
        }
        
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
//get all jobs
//for student to view and search jobs
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                {title: { $regex: keyword, $options: 'i' }},
                {description: { $regex: keyword, $options: 'i' }},
                {location: { $regex: keyword, $options: 'i' }},
            ]
        };
        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1});
        if (!jobs){
            return res.status(404).json({
                message: "No jobs found",
                success: false,
            }); 
        }
        return res.status(200).json({
            
            jobs,
            success: true,
        });
    } catch (error) {
        console.error("Error in fetching jobs:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
//get job by id
//for student to view job details
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        // validate object id
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                message: "Invalid job ID format",
                success: false,
            });
        }

        const job = await Job.findById(jobId)
            .populate({ path: "company" })
            .populate({ path: "applications", populate: { path: "applicant", select: "_id name email" } });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }
        return res.status(200).json({
            job,
            success: true,
        });
    } catch (error) {
        console.error("Error in fetching job:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
//for recruiter to get their posted jobs
export const getAdminJobs =async (req, res) => {
    try {
        const adminId = req.id; // Extracted from isauth middleware
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
            
        });
        if (!jobs) {
            return res.status(404).json({
                message: "No jobs found",
                success: false,
            });
        }
        return res.status(200).json({
            jobs,
            success: true,
        });
    } catch (error) {
        console.error("Error in fetching admin jobs:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
        
