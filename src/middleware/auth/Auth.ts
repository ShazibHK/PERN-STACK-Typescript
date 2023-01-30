import jwt from "jsonwebtoken";
import  { config } from "dotenv"
config()
const auth = async (req:any, res:any, next:any) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, "SECRET_KEY", (err: any, user: any) => {
      console.log(err)
      if (err) return res.sendStatus(403).json({message:"jwt expired"})
      req.user = user
      next()
    })
  } catch (error) {
    console.log(error);
  }
};

export default auth;