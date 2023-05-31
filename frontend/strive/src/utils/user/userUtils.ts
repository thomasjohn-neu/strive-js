import * as apiRequestUtils from '../requestUtils/api-request-utils';

/**
 * To SignIn User
 * @param {JSON} user - user details
 */

 export const signInUser = async function(user:any){
    const data = await apiRequestUtils.postReq('user/signin',user);  
    return data;
  }

/**
 * To SignUp User
 * @param {JSON} user - user details
 */

export const signUpUser = async function(user:any){
  const data = await apiRequestUtils.postReq('user',user);  
  return data;
}

