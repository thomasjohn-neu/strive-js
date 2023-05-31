import * as challengeLogService from '../services/challengeLog-services.js';
// import * as responseUtils from './../utils/response-utils.js';
// import { ChallengeLog } from '../models/challengeLog-model.js';
// import { Challenge } from '../models/challenge-model.js';
// import { User } from '../models/user-model.js';
import {logger} from '../config/logger.js';
import * as userService from './../services/user-services.js'
import * as responseUtils from './../utils/responseUtils.js';
import { verifyToken } from '../security/authentication.js';
import {sendWebSocketMessageToAll, sendWebSocketMessageToClient} from '../websocket/socket-routes.js'


// TODO: Create a challenge log
// 1. Authenticate the user
// 2. Validate the request body (errors can be caught at frontend - datatypes exceptions can be caught when trying to save to db)
// 3. Check if the user has joined the challenge that they are trying to log
// 4. Check if the user has already logged the challenge for the day
// 5. Create the challenge log
// 6. Return the challenge log

export const createChallengeLog = async (req, res) => {
    try{
        const payload = req.body;
        const token = req.headers.token;
        const tokenPayload = await verifyToken(token);
        const user = await userService.getUser(tokenPayload.username);
        payload.userId = user._id;//.toString();
        

        // Callling the service to create the challenge log
        const challengeLog = await challengeLogService.createChallengeLog(payload,payload.userId); 
        
        // Setting the response
        responseUtils.setSuccessResponse(201, challengeLog, res);  
        let message = user.username + " logged a activity for Challenge";
        sendWebSocketMessageToAll(message);
        //logger.info("Challenge log created successfully");  
    }
    catch(error){
        console.log(error)
        responseUtils.setErrorResponse(error,res);
        //logger.error("Challenge log creation failed");
    }
}

export const createChallengeLogExtension = async (req, res) => {
    try{
        const payload = req.body;
        let userId = await userService.getFirstUser();
        if(userId) {
            console.log('userId=-'+userId.toString());
            userId = userId.toString();
            const challengeLog = await challengeLogService.createChallengeLogExtension(payload,userId); 
            responseUtils.setSuccessResponse(201, challengeLog, res);  
        }
    }
    catch(error){
        console.log(error)
        responseUtils.setErrorResponse(error,res);
        //logger.error("Challenge log creation failed");
    }
}

export const getAllChallengeLogsByChallengeId = async (req, res) => {
    try{
        const challengeId = req.params.challenge_id;
        const userId = req.query.userId;
        const challengeLogs = await challengeLogService.getAllChallengeLogsByChallengeId(challengeId, userId);
        responseUtils.setSuccessResponse(200, challengeLogs, res);
    }
    catch(error){
        console.log(error)
        responseUtils.setErrorResponse(error,res);
    }
}


export const getChallengeLogByLogId = async (req, res) => {
    try{
        const logId = req.params.logId;
        const challengeLog = await challengeLogService.getChallengeLogByLogId(logId);
        responseUtils.setSuccessResponse(200, challengeLog, res);
    }
    catch(error){
        console.log(error)
        responseUtils.setErrorResponse(error,res);
    }
}

export const updateChallengeLog = async (req, res) => {
    try{
        const payload = req.body;
        const logId = req.params.logId;
        const challengeLog = await challengeLogService.updateChallengeLog(payload,logId);
        responseUtils.setSuccessResponse(200, challengeLog, res);
    }
    catch(error){
        console.log(error)
        responseUtils.setErrorResponse(error,res);
    }
}


export const deleteChallengeLog = async (req, res) => {
    try{
        const logId = req.params.logId;
        const challengeLog = await challengeLogService.deleteChallengeLog(logId);
        responseUtils.setSuccessResponse(200, challengeLog, res);
    }
    catch(error){
        console.log(error)
        responseUtils.setErrorResponse(error,res);
    }
}







