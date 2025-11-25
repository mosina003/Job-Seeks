import jwt from "jsonwebtoken";

const isauth=async (req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"Unauthorized",
                success:false,
            });
        }
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded){
            return res.status(401).json({
                message:"invalid token",
                success:false,
            });
        }
        req.id = decoded.userId;
        next();
    }catch (error){
        console.error("Error in isauth middleware:", error);
        res.status(500).json({
            message:"Internal server error",
            success:false,
        });
    }
}
export default isauth;
