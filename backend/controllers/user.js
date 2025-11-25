import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const register = async (req, res) => {
    try{
        const {fullname,email,phoneNumber,password,role} = req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:'All fields are required',
                success:false
            });
        };
        
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"user already exist with this email",
                success:false,
            })
        }

        // Handle profile photo upload if file exists
        let profilePhotoUrl = "";
        const file = req.file;
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            profilePhotoUrl = cloudResponse.secure_url;
        }

        const hashedPassword = await bcrypt.hash(password,10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
            profile:{
                profilePhoto:profilePhotoUrl,
            }
        });
        return res.status(201).json({
            message:"Account created successfully",
            success:true,
        });
    }catch (error){
        console.error("Error in user registration:", error);
        res.status(500).json({
            message:"Internal server error",
            success:false,
        });
    }
}
export const login = async (req, res) => {
    try{
        const {email,password,role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message:'All fields are required',
                success:false
            });
        };
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"User not found",
                success:false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Invalid credentials",
                success:false,
            })
        };
        //check role is correct or not
        if(user.role !== role){
            return res.status(400).json({
                message:"Invalid role",
                success:false,
            })
        };
        const tokenData = {
            userId: user._id,
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn:'1d'});
        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
        return res.status(200)
            .cookie('token', token, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'strict'
            })
            .json({
                message: `welcome back ${user.fullname}`,
                user,
                success: true,
            });
    }catch (error){
        console.error("Error in user login:", error);
        res.status(500).json({
            message:"Internal server error",
            success:false,
        });
    }
}
export const logout = async (req, res) => {
    try{
        return res.status(200).cookie('token',"", {maxAge:0,}).json({
            message:"Logged out successfully",
            success:true,
        });
    }catch (error){
        console.error("Error in user logout:", error);
        res.status(500).json({
            message:"Internal server error",
            success:false,
        });
    }
}
export const updateprofile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(',').map(skill => skill.trim());
        }

        const userId = req.id; //middleware auth
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            })
        }

        //updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray
      
        //resume upload to cloudinary
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "raw",
                type: "upload",
                flags: "attachment:false"
            });
            user.profile.resume = cloudResponse.secure_url; //save the cloudinary url
            user.profile.resumeOriginalName = file.originalname; //save the original file name
        }


        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true,
        });
    } catch (error) {
        console.error("Error in updating profile:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}