import * as GroupService from '../services/group-service.js';
import * as CONST from './../../constants.js';
import * as responseUtils from './../utils/responseUtils.js';
import * as userService from './../services/user-services.js';
import { verifyToken } from '../security/authentication.js';
/**
 * Creates a Group.
 * @param {Request} req - Request Object from the client
 * @param {Response} res - Response Object to the client
 */
 export const createGroup=async (request, response)=>{
    try{
      const payload = request.body;
      const token = request.headers.token;
      const tokenPayload = await verifyToken(token);
      const user = await userService.getUser(tokenPayload.username);
      payload.createdBy = user._id.toString;

      // make username from email
      const groupusers = await getUseridFromEmails(payload.groupEmail);
      payload.groupUsers = groupusers;
      const Group = await GroupService.createGroup(payload);
      responseUtils.setSuccessResponse(201,Group,response);
    }
    catch(error){
        console.log(error)
        responseUtils.setErrorResponse(error,response);
    }
  }

  export const getAllGroups = async (req,res) =>{
    try{
      // const item = await userService.getUser(req.ctx.user.username);
      const items = await GroupService.getAllGroups();
      responseUtils.setSuccessResponse(200,items,res);
    }
    catch(error){
      console.log(error)
      responseUtils.setErrorResponse(error, res);
    }
  }

async function getUseridFromEmails(emails) {
  let userIdArray = [];
  for (const email of emails) {
    let user = await userService.getUser(email);
    if (user !== undefined) {
      console.log(user);
      userIdArray.push(user._id);
      
    }
  }
  return userIdArray;
}
  
  // export const getChallengeById = async (req,res) =>{
  //   try{
  //     const id  = req.params.id;
  //     const item = await challengeService.getChallengebyId(id);
  //     console.log({"item details in controller:":item});
  //     responseUtils.setSuccessResponse(200,item,res);
  //   }
  //   catch(error){
  //     console.log(error)
  //     responseUtils.setErrorResponse(error, res);
  //   }
  // }
  
  // export const updateChallenge = async (req,res) =>{
  //   try {
  //     const id  = req.params.id;
  //     const updatedChallenge = {...req.body};
  //     updatedChallenge.id = id;
  //     const updatedObject = await challengeService.updateChallenge(updatedChallenge);
  //     responseUtils.setSuccessResponse(200,updatedObject,res);
  //   } catch (error) {
  //     responseUtils.setErrorResponse(error,res);
  //   }
  // }
  
  // export const deleteChallenge = async (req,res) =>{
  //   try {
  //     const id  = req.params.id;
  //     const deletedObject = await challengeService.deleteChallenge(id);
  //     responseUtils.setSuccessResponse(200,deletedObject,res);
  //   } catch (error) {
  //     responseUtils.setErrorResponse(error,res);
  //   }
  // }