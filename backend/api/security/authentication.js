import jwt from 'jsonwebtoken';
import * as CONST from './../../constants.js';
import * as userService from  './../services/user-services.js';

const TOKEN_ALOG={
  "algorithm":"HS256",
  "expiresIn":CONST.JWT_EXPIRY_SECS
}

export const generateToken= async (username)=>{
  console.log({"generating token for username:":username});
  
  const token = jwt.sign({username},CONST.JWT_SECRET_KEY,TOKEN_ALOG);
  // const token = jwt.sign(
  //   {
  //    username
  //   },
  //   process.env.TOKEN_KEY,
  //   {
  //     expiresIn: '1h',
  //   }
  // );
  console.log(token);
  return token;
}


export const verifyToken = async (token)=>{
  let payload;
  try {
		payload = jwt.verify(token, CONST.JWT_SECRET_KEY)
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
      console.log(e)
			throw "UNAUTHORIZED";
		}
		throw "UNAUTHORIZED_BAD_REQUEST";
	}
  console.log("AUTHORIZED");
  console.log(payload)
  return payload;
}

export const authenticate = async (req,res,next) =>{
    try{
        
    const token = req.headers.token;
    if (!token) {
            return res.status(401).end()
        }
    const payload = await verifyToken(token);
    const user = await userService.getUser(payload.username);
    if(!user){
        res.status(400).end();
        return;
    }
    console.log("user verified");
    console.log(user);
    req.ctx={};
    req.ctx.user = user;
    next();
    }catch(e)
    {
    console.log(e);
    res.status(500).send()
    }
}
