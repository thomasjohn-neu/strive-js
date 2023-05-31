import * as apiRequestUtils from '../requestUtils/api-request-utils';

/**
 * To SignIn User
 * @param {JSON} user - user details
 */

 export const addChallengeLog = async function(challengeLog:any){
    const data = await apiRequestUtils.postReq('challengeLog/',challengeLog);  
    return data;
  }

export const editChallengeLog = async function(challengeLog:any, challengeLogId:string){
  const data = await apiRequestUtils.putReq(`challengeLog/${challengeLogId}`,challengeLog);  
  return data;
}
/*
export const getChallengeLog = async function(params:any, ){
  let url:string = 'challengeLog/challenge_id'
  if(params.challengeType !== null)
    url = url+'?challengeType='+params.challengeType;
  const data = await apiRequestUtils.getReq(url);  
  return data;
}
*/
export const getChallengeLog = async function(challengeid:string, params:any) {
  let url:string = `challengeLog/${challengeid}`
  url = url+'?userId='+params.userId;
  const data = await apiRequestUtils.getReq(url);  
  return data;
}
/*
export const deleteChallengeLog = async function(challengeId:string){
  let url:string = `challenge/${challengeId}`
  const data = await apiRequestUtils.deleteReq(url);  
  return data;
}*/
