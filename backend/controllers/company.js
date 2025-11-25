import {Company} from "../models/company.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        // Company registration logic here
        const{companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message: "Company name is required",
                success: false,
            });
        }
        let company = await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({
                message: "Company already exists",
                success: false,
            });
        }
        company=await Company.create({
            name:companyName,
            userId:req.id,
        });
        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true,
        });
    } catch (error) {
        console.error("Error in company registration:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}
//get companies of logged in user
export const getCompany = async (req, res) => {
    try {
        const userId = req.id; //logged in user id from isauth middleware
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message: "No companies found for this user",
                success: false,
            });
        }
        return res.status(200).json({
            companies,
            success: true,
        });
    } catch (error) {
        console.error("Error in fetching companies:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
//get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id; //param is used to get company id from url(eg:/company/12345)
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Company fetched successfully",
            company,
            success: true,
        });
    } catch (error) {
        console.error("Error in fetching company:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
//update company by id
export const updateCompany = async (req, res) => {
    try {
        // support routes that send multipart/form-data (multer will populate req.body and req.file)
        const { name, description, website, location } = req.body || {};
        const file = req.file; // populated by multer when present

        // if a file was uploaded, convert and upload to Cloudinary and get the secure URL
        let logo;
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            logo = cloudResponse.secure_url;
        }

        // validate unique name: if a different company already uses this name, reject
        if (name) {
            const existing = await Company.findOne({ name });
            if (existing && String(existing._id) !== String(req.params.id)) {
                return res.status(400).json({
                    message: "Company name already in use",
                    success: false,
                });
            }
        }

        // only include fields that are present to avoid overwriting with undefined
        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (location !== undefined) updateData.location = location;
        if (logo !== undefined) updateData.logo = logo;
        if (website !== undefined) updateData.website = website;

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Company information updated successfully",
            company,
            success: true,
        });
    } catch (error) {
        console.error("Error in updating company:", error);
        // handle Mongo duplicate key error explicitly
        if (error && error.code === 11000) {
            return res.status(409).json({
                message: 'Duplicate value error',
                details: error.keyValue,
                success: false,
            });
        }
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};