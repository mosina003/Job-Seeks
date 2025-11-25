import { Application } from "../models/application.js";
import { Job } from "../models/job.js";

//apply for a job
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const {id:jobId} = req.params;  
        if (!jobId){
            return res.status(400).json({
                message: "Job ID is required",
                success:false
            })
        };
        //check if the user has already applied for the job
        const existingApplication = await Application.findOne({applicant: userId, job: jobId});

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }
        //check if job exists
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }
        //create new application
        const application = await Application.create({
            job:jobId,
            applicant:userId,
        });
        job.applications.push(application._id);
        await job.save();
        return res.status(201).json({
            message: "Job application submitted successfully",
            application,
            success: true
        });
    } catch (error) {
        console.error("Error in applying for job:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
//get the applied jobs of a user
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const applications = await Application.find({applicant: userId}).sort({createdAt:-1}).populate({
        path:'job',
        options:{sort:{createdAt:-1}},
        populate:{
            path:'company',
            options:{sort:{createdAt:-1}},
        }
        });
        if (!applications) {
            return res.status(404).json({
                message: "No applications found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Applied jobs retrieved successfully",
            applications,
            success: true
        });
    } catch (error) {
        console.error("Error in getting applied jobs:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
    
};
//get applicants for a job for the recruiter
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        // Populate applications (the Job schema field) and the applicant inside each Application
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant',
                model: 'User'
            }
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Applicants retrieved successfully",
            job: {
                applications: job.applications
            },
            success: true,
        });
    } catch (error) {
        console.error("Error in getting applicants:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
//update application status by recruiter
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body || {};
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false,
            });
        }
        //find the application by applicationId
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            });
        }
        // Normalize status to match schema enum (case-insensitive input allowed)
        const statusMap = {
            pending: 'Pending',
            reviewed: 'Reviewed',
            accepted: 'Accepted',
            rejected: 'Rejected',
        };
        const normalized = statusMap[String(status).trim().toLowerCase()];
        if (!normalized) {
            return res.status(400).json({
                message: 'Invalid status. Allowed: Pending, Reviewed, Accepted, Rejected',
                success: false,
            });
        }
        // update the application status
        application.status = normalized;
        await application.save();
        return res.status(200).json({
            message: "Application status updated successfully",
            application,
            success: true
        });
    } catch (error) {
        console.error("Error in updating application status:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};