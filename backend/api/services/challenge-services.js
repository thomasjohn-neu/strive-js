import moment from "moment";
import { Challenge , GroupModel, ChallengeParticipants , Dashboard ,User } from "../models/index.js";

/**
 * Creates a new challenge
 * @param {Challenge} challengeData - New challenge that needs to be created
 */

 export const createChallenge = async (challengeData)=>{
    if(challengeData.challengeType == "study"){
      let numOfDays = moment(challengeData.endDate).diff(moment(challengeData.startDate), "days")
      challengeData.totalTargetTime = challengeData.studyDuration * numOfDays;
      challengeData.totalTopics = challengeData.studyTopicData.length;
      challengeData.studyChallengeData = {studyDuration: challengeData.studyDuration, studyTopicData: challengeData.studyTopicData}
      delete challengeData.studyDuration;
      delete challengeData.studyTopicData;
      
      // challengeData.owneruserId=userData._id;
      //if it is a group challenge , group id will be sent 
      // now , populate all the users in the group and add them to the challenge 
      // in the challengeParticipants table 

      const challenge = new Challenge(challengeData);
      challenge.save();
      //add the owner to the challengeParticipants table
      //add the owner to the challengeLog table
      const challengeParticipant = new ChallengeParticipants({challengeId:challenge._id,userId:challengeData.owneruserId});
      challengeParticipant.save();

      const dashboard = new Dashboard({challengeId:challenge._id,userId:challengeData.owneruserId,completionProgressPercentage:0,totalTimeSpentPercentage:0,totalCompletetedTime:0, totalCompletedTasks:0, totalTargetedTime:challenge.totalTargetTime, totalTargetedTasks:challenge.totalTopics});
      dashboard.save();

      if(challengeData.groupId){
        //get all the users in the group
        //add them to the challengeParticipants table
        //add them to the challengeLog table
        const groupData= await GroupModel.findById(challengeData.groupId).exec();
        const groupUsers = groupData.groupEmail;
        for (let i = 0; i < groupUsers.length; i++) {
          const obj = groupUsers[i];
          console.log(`obj is ${obj}`);
          const user = await User.find({"email":obj}).exec();
          console.log(`user is ${user}`);
          const challengeParticipant = new ChallengeParticipant({challengeId:challenge._id,userId:user._id});
          challengeParticipant.save();

          const dashboard = new Dashboard({challengeId:challenge._id,userId:user._id,completionProgressPercentage:0,totalTimeSpentPercentage:0,totalCompletetedTime:0, totalCompletedTasks:0, totalTargetedTime:challenge.totalTargetTime, totalTargetedTasks:challenge.totalTopics.length});
          dashboard.save();
        }
      }
      //todo : after joining the challenge - create an empty 
      // log entry for each user in the dashboard table 
      return challenge;
    }
  }

  export const getAllChallenges = async ()=>{
    const challenges = await Challenge.find().exec();
    return challenges;
  }

  export const getChallengebyId = async (challengeId)=>{
    const challenge= await Challenge.findById(challengeId).exec();
    const { _doc, ...formattedChallenge } = { ...challenge._doc };
    formattedChallenge.startDate = challenge.startDate.toISOString().slice(0, 10);
    formattedChallenge.endDate = challenge.endDate.toISOString().slice(0, 10);
    return formattedChallenge;
  }

  export const getAllChallengesByPrivacy = async (privacy)=>{
    const challenge =await Challenge.find({"privacy":privacy}).exec();
    const { _doc, ...formattedChallenge } = { ...challenge._doc };
    formattedChallenge.startDate = challenge.startDate.toISOString().slice(0, 10);
    formattedChallenge.endDate = challenge.endDate.toISOString().slice(0, 10);
    return formattedChallenge;
  }

  export const getAllChallengesByType = async (challengeType)=>{
    const challenge = await Challenge.find({"challengeType":challengeType}).exec();
    const { _doc, ...formattedChallenge } = { ...challenge._doc };
    formattedChallenge.startDate = challenge.startDate.toISOString().slice(0, 10);
    formattedChallenge.endDate = challenge.endDate.toISOString().slice(0, 10);
    return formattedChallenge;
  }

  export const getAllChallengesStudy = async (challengeType)=>{
    const challenge = await Challenge.find({"challengeType":challengeType}).exec();
    return challenge;
  }

  export const updateChallenge = async (challengeData)=>{
    const challenge_id=challengeData.id;
    delete challengeData.modifiedDate;
    if(challengeData.challengeType == "study"){
      let numOfDays = moment(challengeData.endDate).diff(moment(challengeData.startDate), "days")
      challengeData.totalTargetTime = challengeData.studyDuration * numOfDays;  
    }
    const challenge = await Challenge.findByIdAndUpdate(challenge_id,challengeData,{new:true}).exec();
    return challenge;
  }

  export const deleteChallenge = async (challengeId)=>{
    const challenge =await Challenge.findByIdAndDelete(challengeId).exec();
    return challenge;
  }    

  export const getAllChallengesByUserJoined = async (userId) =>{
    try {
      const userId = req.params.userId;
      
      // Find all challenge IDs that this user has joined
      const challengeParticipantDocs = await ChallengeParticipants.find({
        participants: userId
      }).exec();
      const challengeIds = challengeParticipantDocs.map(cp => cp.challengeId);
  
      // Find all challenge documents for these challenge IDs
      const challengeDocs = await Challenge.find({
        _id: { $in: challengeIds }
      }).exec();
  
      res.json(challengeDocs);
    }catch(err){
      res.status(400).json({error: err});
    }
  }

  export const NegateGetAllChallengesByUserJoined = async (userId) =>{
    try {
      const userId = req.params.userId;
      
      // Find all challenge IDs that this user has joined
      const challengeParticipantDocs = await ChallengeParticipants.find({
        participants: userId
      }).exec();
      const challengeIds = challengeParticipantDocs.map(cp => cp.challengeId);
  
      // Find all challenge documents for these challenge IDs
      const challengeDocs = await Challenge.find({
        _id: { $in: challengeIds }
      }).exec();
  
      res.json(challengeDocs);
    }catch(err){
      res.status(400).json({error: err});
    }
  }



  






