import jwt from "jsonwebtoken"
const  isAuth=async(req,res,next)=>{
    try{
const token=req.cookies.token // to check whether the id that is stored in token is present in cookie or not
if(!token){
    return res.status(400).json({message:"token is not found!"})
    }
    const verifytoken=await jwt.verify(token,process.env.JWT_SECRET)
    req.userId=verifytoken.userId
    next()
}catch(error){
    return res.status(500).json({message:`is auth error ${error}`})

}
}
export default isAuth;