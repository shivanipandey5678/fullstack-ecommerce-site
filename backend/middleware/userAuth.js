import jwt from 'jsonwebtoken';
const userAuth=async(req, res, next)=>{
    const {token}=req.headers;
    try {
        if(!token){
            return res.status(400).json({success:false,message:"tokin missing ,login again"})
        }
        const decoded= jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!decoded){
            return res.status(400).json({success:false,message:"issue in verifing token"})
        
        }
        req.body.userId=decoded.id;
    
        next()
    } catch (error) {
        return res.status(500).json({success:false,message:error.message,"hint":'userAuth'})
    }
 


}
export default userAuth;