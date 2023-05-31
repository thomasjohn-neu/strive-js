import * as challengeService from '../services/challenge-services.js';
import * as CONST from './../../constants.js';
import * as responseUtils from './../utils/responseUtils.js';
import * as userService from './../services/user-services.js';
import { verifyToken } from '../security/authentication.js';
import * as dashboardService from './../services/dashboard-services.js';

export const getDashboardDetails = async (req,res) =>{
    try{
        const token = req.headers.token;
        const tokenPayload = await verifyToken(token);
        const user = await userService.getUser(tokenPayload.username);
        const challengeId=req.query.challengeId;
        const userId = req.query.userId;
        console.log("req sdsdsd ", req.query)
        // const items = await challengeService.getDashboardDetails(user._id);
        const dashboardData = await dashboardService.getDashboardDetails(userId, challengeId);
        console.log({"item details in controller: ===== ":dashboardData});
        // console.log({"item details in controller:":items});
        responseUtils.setSuccessResponse(200,dashboardData,res);
    }
    catch(error){
        console.log(error)
        responseUtils.setErrorResponse(error, res);
    }
}

export const getDashboardDetailsByChallengeId = async (req,res) =>{
    try{
        const challengeId=req.query.challengeId;
        const dashboardData = await dashboardService.getDashboardDetailsByChallengeId(challengeId);
        console.log("item details in controller sasasassa: ===== ", req.params);
        responseUtils.setSuccessResponse(200,dashboardData,res);
    }catch(error){
        console.log(error)
        responseUtils.setErrorResponse(error, res);
    }
}