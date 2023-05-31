//figure out the parameters for the challengeLog post query and the challengeLog get query
import  {ChallengeLog}  from '../models/index.js';
import * as responseUtils from './../utils/responseUtils.js';
import {Challenge, Dashboard} from '../models/index.js';
import {User} from '../models/index.js';

//todo : send the userData as well from the tokens
export const createChallengeLog = async (challengeLogData,userId) => {
    delete challengeLogData.logDateTime;
    // challengeLogData.userId=userData._id.toString();
    console.log(userId, " csdsdsdd ")
    // const userId=user._id.toString();
    const challengeLog = new ChallengeLog(challengeLogData);
    await challengeLog.save();
    const progressData = await calculateProgressPercentage(challengeLog.challengeId, userId);
    const timeData = await calculateTotalTimeSpent(challengeLog.challengeId,userId); 
    const dashBoardData = { "userId": userId, "challengeId": challengeLog.challengeId, "completionProgressPercentage": progressData.completionProgressPercentage ,"totalTimeSpentPercentage":timeData.totalTimeSpentPercentage, "totalCompletetedTime": timeData.totalTimeSpent,"totalTargetedTime":timeData.totalTargetTime, "totalTargetedTasks": progressData.totalTargetedTasks ,"totalCompletedTasks":progressData.totalCompletedTasks};
    console.log("dashboard..... ", dashBoardData);    
    const dashboardCheck = await Dashboard.findOneAndUpdate({userId: userId, challengeId: challengeLog.challengeId}, dashBoardData, {upsert: true, new: true});
    if(dashboardCheck.length===0){
        const dashBoardRecord = new Dashboard(dashBoardData);
        await dashBoardRecord.save();
    }
    return challengeLog;
}

export const createChallengeLogExtension = async (challengeLogData,userId) => {
    delete challengeLogData.logDateTime;
    challengeLogData.userId=userId;
    console.log(challengeLogData);
    // const userId=user._id.toString();
    const challengeLog = new ChallengeLog(challengeLogData);
    await challengeLog.save();
  /*  const progressData = await calculateProgressPercentage(challengeLog.challengeId, userId);
    const timeData = await calculateTotalTimeSpent(challengeLog.challengeId,userId);
    const dashBoardData = { "userId": userId, "challengeId": challengeLog.challengeId, "completionProgressPercentage": progressData.completionProgressPercentage ,"totalTimeSpentPercentage":timeData.totalTimeSpentPercentage, "totalCompletetedTime": timeData.totalTimeSpent,"totalTargetedTime":timeData.totalTargetTime, "totalTargetedTasks": progressData.totalTargetedTasks ,"totalCompletedTasks":progressData.totalCompletedTasks};
    console.log("dashboard..... ", dashBoardData);    
    const dashboardCheck = await Dashboard.findOneAndUpdate({userId: userId, challengeId: challengeLog.challengeId}, dashBoardData, {upsert: true, new: true});
    if(dashboardCheck.length===0){
        const dashBoardRecord = new Dashboard(dashBoardData);
        await dashBoardRecord.save();
    }*/
    return challengeLog;
}

export const getAllChallengeLogsByChallengeId = async (challenge_id, user_id) => {
    const challengeLogs = await ChallengeLog.find( {challengeId : challenge_id, userId : user_id} ).exec();
    return challengeLogs;
}

export const getChallengeLogByLogId = async (challengeLogId) => {
    const challengeLog = await ChallengeLog.findById(challengeLogId).exec();
    return challengeLog;
}

export const updateChallengeLog = async (challengeLogData,logId) => {
    const challengeLog_id=logId;
    delete challengeLogdata.logDateTime;
    const challengeLog = await ChallengeLog.findByIdAndUpdate({challengeLog_id},challengeLogData,{new:true}).exec();
    return challengeLog;
}


export const deleteChallengeLog = async (challengeLogId) => {
    const challengeLog = await ChallengeLog.findByIdAndDelete(challengeLogId).exec();
    return challengeLog;
}


//returning total tasks completed
export const calculateProgressPercentage = async(challengeId, userId) => {
    const challenge = await Challenge.findById(challengeId).exec();
    // const user = await User.findById(userId).exec();
    const totalTargetedTasks = challenge.totalTopics;
    try {
        const totalCompletedTopics = await ChallengeLog.aggregate([
            { $match: { challengeId: challengeId, userId:  userId, activityCompletionStatus: true } },  
            { $group: { _id: "$topic", totalCompletedTopics: { $sum: 1 } } },
            { $group: { _id: null, uniqueTopicsCount: { $sum: 1 } } } ]);
        const completedTaskscount = totalCompletedTopics.length > 0 ? totalCompletedTopics[0].uniqueTopicsCount : 0;
        // console.log (totalCompletedTopics, "   totalCompletedTopics   ", completedTaskscount);
        console.log("completedTaskscount---- ", completedTaskscount, "     totalTargetedTasks", totalTargetedTasks)
        const completionProgressPercentage = (completedTaskscount / totalTargetedTasks) * 100;
        const progressData={ "totalCompletedTasks": completedTaskscount, "totalTargetedTasks": totalTargetedTasks , "completionProgressPercentage" : completionProgressPercentage };
        return progressData;
      } catch (error) {
        console.log(error);
        throw new Error(`Failed to count completed activities: ${error}`);
      }
}

export const  calculateTotalTimeSpent = async (challengeId, userId) => {
    const challenge = await Challenge.findById(challengeId).exec();
    // const user = await User.findById(userId).exec();
    const totalTargetTime = challenge.totalTargetTime;
    console.log("totalTargetTime---- ", totalTargetTime);
    try {
        const filter = {
            userId,
            challengeId,
            activityCompletionStatus: true
        };
      
        const docs = await ChallengeLog.find(filter);
      
        const timeSpent = docs.reduce((sum, doc) => sum + doc.activityDuration, 0);
        //const timeSpent= (result[0].totalDuration); // Return duration sum or 0 if result is empty
        const timeData={ "totalTimeSpent": timeSpent, "totalTargetTime": totalTargetTime , "totalTimeSpentPercentage" : (timeSpent/totalTargetTime)*100 };
        return timeData;
        
      
          



    //   const query = [
    //     {
    //       $match: {
    //         challengeId: challengeId,
    //         userId: userId
    //       },
    //     },
    //     {
    //       $group: {
    //         _id: {
    //           userId: "$userId",
    //           challengeId: "$challengeId",
    //         },
    //         // durationSum: { $sum: "$activityDuration" },
    //       },
    //     },
    //   ];
    

    //console.log(userId, "   fucnling user did");
    // const result = await ChallengeLog.aggregate([
    //     { $match: { challengeId: challengeId, userId:  userId } },  
    //     { $group: { _id: null, totalDuration: { $sum: '$activityDuration' } } } ]);

    // ], (err, result) => {
    //     if (err) { 
    //         // Handle the error  
    //     } else { 
    //         const totalDuration = result.length > 0 ? result[0].totalDuration : 0; 
    //         console.log('Total duration:', totalDuration);
    //      } });
    //   const result = await ChallengeLog.aggregate(query);

    } catch (error) {
      throw new Error(`Failed to get duration sum: ${error}`);
    }
  }
  
// export const calculateTotalTimeSpent = async(challengeId, userId) => {
//     const challenge = await Challenge.findById(challengeId).exec();
//     const user = await User.findById(userId).exec();
//     const totalTargetTime = challenge.totalTargetTime;
//     try {
//         const totalTimeSpent = await ChallengeLog.aggregate([
//           {
//             $group: {
//               _id: {
//                 userId: "$userId",
//                 challengeId: "$challengeId",
//               },
//               count: { $sum: 1 },
//             },
//           },
//         ]);
//         // const dashBoardData = { "userId": user._id, "challengeId": challenge._id, "completionProgressPercentage": completionProgressPercentage };
//         // const dashBoardRecord = new Dashboard(dashBoardData);
//         // return dashBoardRecord.save();
//         console.log("totalTimeSpent",totalTimeSpent);
//         return totalTimeSpent;
//       }
//         catch (error) {
//         console.log(error);
//         throw new Error(`Failed to count completed activities: ${error}`);
//         }
// }







