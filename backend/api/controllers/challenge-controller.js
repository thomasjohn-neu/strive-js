import * as challengeService from '../services/challenge-services.js';
import * as CONST from './../../constants.js';
import * as responseUtils from './../utils/responseUtils.js';
import * as userService from './../services/user-services.js';
import { verifyToken } from '../security/authentication.js';

/**
 * Creates a Challenge.
 * @param {Request} req - Request Object from the client
 * @param {Response} res - Response Object to the client
 */
 export const createChallenge=async (request, response)=>{
    try{
    const payload = request.body;
    const token = request.headers.token;
    const tokenPayload = await verifyToken(token);
    const user = await userService.getUser(tokenPayload.username);
    payload.owneruserId = user._id;

    const challenge = await challengeService.createChallenge(payload);
    responseUtils.setSuccessResponse(201,challenge,response);
    }
    catch(error){
        console.log(error)
        responseUtils.setErrorResponse(error,response);
    }
  }

/**
 * Returns all Challenges.
 * @param {Request} req - Request Object from the client
 * @param {Response} res - Response Object to the client
 */
export const getAllChallenges = async (req,res) =>{
  try{
    // const item = await userService.getUser(req.ctx.user.username);
    const items = await challengeService.getAllChallenges();
    responseUtils.setSuccessResponse(200,items,res);
  }
  catch(error){
    console.log(error)
    responseUtils.setErrorResponse(error, res);
  }
}

export const getAllChallengesByUserJoined = async (req,res) =>{
  try{
    const token = req.headers.token;
    const tokenPayload = await verifyToken(token);
    const user = await userService.getUser(tokenPayload.username);
    const items = await challengeService.getAllChallengesByUserJoined(user._id);
    responseUtils.setSuccessResponse(200,items,res);
  }
  catch(error){
    console.log(error)
    responseUtils.setErrorResponse(error, res);
  }
}



export const getChallengeById = async (req,res) =>{
  try{
    const id  = req.params.id;
    const item = await challengeService.getChallengebyId(id);
    responseUtils.setSuccessResponse(200,item,res);
  }
  catch(error){
    console.log(error)
    responseUtils.setErrorResponse(error, res);
  }
}

export const getAllChallengesByPrivacy = async (req,res) =>{
  try{
    const privacy  = req.params.privacy;
    const items = await challengeService.getAllChallengesByPrivacy(privacy);
    responseUtils.setSuccessResponse(200,items,res);
  }
  catch(error){
    console.log(error)
    responseUtils.setErrorResponse(error, res);
  }
}

export const getAllChallengesByType = async (req,res) =>{
  try{
    const type  = req.params.type;
    const items = await challengeService.getAllChallengesByType(type);
    responseUtils.setSuccessResponse(200,items,res);
  }
  catch(error){
    console.log(error)
    responseUtils.setErrorResponse(error, res);
  }
}

export const getAllChallengesStudy = async (req,res) =>{
  try{
    const items = await challengeService.getAllChallengesStudy('study');
    responseUtils.setSuccessResponse(200,items,res);
  }
  catch(error){
    console.log(error)
    responseUtils.setErrorResponse(error, res);
  }
}

export const updateChallenge = async (req,res) =>{
  try {
    const id  = req.params.id;
    const updatedChallenge = {...req.body};
    updatedChallenge.id = id;
    const updatedObject = await challengeService.updateChallenge(updatedChallenge);
    responseUtils.setSuccessResponse(200,updatedObject,res);
  } catch (error) {
    responseUtils.setErrorResponse(error,res);
  }
}

export const deleteChallenge = async (req,res) =>{
  try {
    const id  = req.params.id;
    const deletedObject = await challengeService.deleteChallenge(id);
    responseUtils.setSuccessResponse(200,deletedObject,res);
  } catch (error) {
    responseUtils.setErrorResponse(error,res);
  }
}