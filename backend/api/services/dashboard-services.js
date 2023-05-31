import {Dashboard, User} from '../models/index.js';
import mongoose from "mongoose";


export const getDashboardDetails = async (userId, challengeId) => {
    try{
        const dashboardData = await Dashboard.find({userId:userId, challengeId:challengeId}).exec();
        console.log("dashBoardData --- ",dashboardData)
        return dashboardData;
    }
    catch(error){
        console.log(error)
        throw error;
    }
}

export const getDashboardDetailsByChallengeId = async (challengeId) => {
    try {
      const dashBoardData = await Dashboard.find({ challengeId }).exec();
      const response = [];
      for (let item of dashBoardData) {
        const user = await User.findOne({ _id: item.userId }).exec();
        const newItem = { ...item.toObject(), username: user.first_name, userId: user._id };
        response.push(newItem);
      }
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  