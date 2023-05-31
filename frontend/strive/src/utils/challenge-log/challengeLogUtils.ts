import * as apiRequestUtils from '../requestUtils/api-request-utils';

// for pomodoro challenge logging

 export const addPomodoroChallengeLog = async function(challengeLog:any){
    const data = await apiRequestUtils.postReq('challengeLog/',challengeLog);  
    return data;
  }