
import {User} from '../models/index.js';
import * as EncryptUtil from './../utils/encryptUtils.js';
import { generateToken } from '../security/authentication.js';


/**
 * Creates a new user
 * @param {User} userData - New user that needs to be created
 */

export const createUser = async (userData)=>{
  const existingUser = await getUser(userData.username);
  if(existingUser == null){
    delete userData.created_time;
    delete userData.updated_time;
    userData.password = await EncryptUtil.hashValue(userData.password);
    const user = new User(userData);
    return user.save();
  }
  else{
    throw "USER_ALREADY_EXISTS";
  }
}

/**
 * Returns User based on email
 * @param {string} username - username that needs to be returned
 */
export const getUser =async (username,pass = false) =>{
  // console.log(User.User.findOne);
  let data =  await User.findOne({username:username}).exec();
  if(data && !pass){
    delete data.password
    data.password=undefined;
  }
  return data;
}

/**
 * Updates the User 
 * @param {User} updatedUser - updated Item
 */
export const updateUser = async (updatedUser) =>{
  updatedUser.modifiedDate = new Date();
  delete updatedUser.createdDate;
  updatedUser.password = await EncryptUtil.hashValue(updatedUser.password);
  const updatedItem =  User.findByIdAndUpdate(updatedUser.id,updatedUser,{new:true}).exec();
  return updatedItem;
}

/**
 * Removes the User based on Id.
 * @param {string} id - User id that needs to be removed.
 */
export const deleteUser = (id) =>{

  const deletedItem = User.findByIdAndDelete(id).exec();
  return deletedItem;
}

export const userSignIn = async ({username,password})=>
{
  const userdata = await getUser(username,true);
  const bool = await EncryptUtil.compareHash(password,userdata.password);
  if(bool){
      const token  = generateToken(username);
      return token
  } 
  else{
    throw "INVALID_CREDENTIALS";
  }
}

/**
 * Returns User based on email
 * @param {string} username - username that needs to be returned
 */
export const getFirstUser =async () =>{
  const existingUser = await User.find().exec();
  console.log('existingUser--'+existingUser);
  return existingUser[0]._id;
}