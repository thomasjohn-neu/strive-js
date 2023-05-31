import * as apiRequestUtils from '../requestUtils/api-request-utils';

/**
 * To SignIn User
 * @param {JSON} user - user details
 */

 export const addChallenge = async function(challenge:any){
    const data = await apiRequestUtils.postReq('challenge/',challenge);  
    return data;
  }

export const editChallenge = async function(challenge:any, challengeId:string){
  const data = await apiRequestUtils.putReq(`challenge/${challengeId}`,challenge);  
  return data;
}

export const getChallenges = async function(params:any){
  let url:string = 'challenge/'
  if(params.challengeType !== null) {
    url = url+'?challengeType='+params.challengeType;
  }
  // if(params.userId !== null) {
  //   url = url+'?userId='+params.userId;
  // }
  const data = await apiRequestUtils.getReq(url);  
  return data;
}

export const getChallenge = async function(challengeId:string){
  let url:string = `challenge/${challengeId}`
  const data = await apiRequestUtils.getReq(url);  
  return data;
}

export const deleteChallenge = async function(challengeId:string){
  let url:string = `challenge/${challengeId}`
  const data = await apiRequestUtils.deleteReq(url);  
  return data;
}
