
import jwt from 'jsonwebtoken';

const adminAuth =async(req,res,next)=>{
    try {
        const{ token}=req.headers;
        if(!token){
            return res.status(400).json({success:false,message:'Token missing, Login again'})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(decoded!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.status(400).json({success:false,message:'Unauthorized: Invalid token credentials.'})
        }
        next()
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

export default adminAuth;