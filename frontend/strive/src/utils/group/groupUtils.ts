import * as apiRequestUtils from '../requestUtils/api-request-utils';

/**
* To Group User
* @param {JSON} Group - group details
*/

export const addGroup = async function(group:any){
  const data = await apiRequestUtils.postReq('group/',group);  
  return data;
}

export const editGroup = async function(group:any, groupId:string){
  const data = await apiRequestUtils.putReq(`group/${groupId}`,group);  
  return data;
}
  
export const getGroups = async function(){
  let url:string = 'group/'
  const data = await apiRequestUtils.getReq(url);  
  return data;
}
  
export const getGroup = async function(groupId:string){
  let url:string = `group/${groupId}`
  const data = await apiRequestUtils.getReq(url);  
  return data;
}
  
export const deleteGroup = async function(groupId:string){
  let url:string = `group/${groupId}`
  const data = await apiRequestUtils.deleteReq(url);  
  return data;
}
  
