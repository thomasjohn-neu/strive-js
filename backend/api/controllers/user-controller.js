import * as userService from '../services/user-services.js';
import * as CONST from './../../constants.js';
import {sendWebSocketMessageToAll} from '../websocket/socket-routes.js'

/**
 * Sets error to the response.
 * @param {Object} error - Error Object 
 * @param {Response} response - Response Object to the client
 */
const setErrorResponse=(error, response)=>{
  response.status(500);
  response.json(error);
}

/**
 * Sets response code and body to the response.
 * @param {int} statusCode - Response status code 
 * @param {Object} object - Response body object 
 * @param {Response} response - Response Object to the client
 */
const setSuccessResponse=(statusCode,object, response)=>{
  response.status(statusCode);
  response.json(object);
}

/**
 * Creates an User.
 * @param {Request} req - Request Object from the client
 * @param {Response} res - Response Object to the client
 */
export const createUser=async (request, response)=>{
  try{
  const payload = request.body;
  const user = await userService.createUser(payload);
  setSuccessResponse(201,user,response);
  }
  catch(error){
    if(error === "USER_ALREADY_EXISTS"){
      response.status(400);
      response.send({"reason":"Email already registered, please sign in"});
      return;
    }
    else{
      console.log(error)
      setErrorResponse(error,response);
    }
    
  }
}


/**
 * Returns an User.
 * @param {Request} req - Request Object from the client
 * @param {Response} res - Response Object to the client
 */
export const getUser = async (req,res) =>{
  try{
    const item = await userService.getUser(req.ctx.user.username);
    setSuccessResponse(200,item,res);
  }
  catch(error){
    console.log(error)
    setErrorResponse(error, res);
  }
}

/**
 * Updated an User.
 * @param {Request} req - Request Object from the client
 * @param {Response} res - Response Object to the client
 */
export const updateUser = async (req,res) =>{
  try {
    const id  = req.params.id;
    const updatedUser = {...req.body};
    updatedUser.id = id;
    const updatedObject = await userService.updateUser(updatedUser);
    setSuccessResponse(200,updatedObject,res);
  } catch (error) {
    setErrorResponse(error,res);
  }
}


/**
 * SignIn User.
 * @param {Request} req - Request Object from the client
 * @param {Response} res - Response Object to the client
 */
 export const signIn = async (req,res) =>{
  try {
    const userDetails = {...req.body};
    let token;
    try{
    token = await userService.userSignIn(userDetails);
    const userData = await userService.getUser(userDetails.username);
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.cookie("token", token, { maxAge: CONST.JWT_EXPIRY_SECS * 10000 });
    sendWebSocketMessageToAll(userDetails.first_name+ " logged in now...");
    res.json({"token": token,'user':userData,"opts": { maxAge: CONST.JWT_EXPIRY_SECS * 10000 }});
    }
    catch(e){
      console.log(e);
      if(e === "INVALID_CREDENTIALS" || e === "UNAUTHORIZED"){
        res.status(401).end();
      }else if(e === "UNAUTHORIZED_BAD_REQUEST"){
        res.status(400).end();
      }
      return;
    }
   
  } catch (error) {
    console.log(error);
    setErrorResponse(error,res);
  }
}
