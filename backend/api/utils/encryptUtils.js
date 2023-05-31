import bcrypt from 'bcrypt';
import * as CONST from './../../constants.js';


export const hashValue= async function(value){
  return await bcrypt.hash(value,CONST.HASH_SALT_ROUNDS);
}


export const compareHash= async function(curVal, hashedPassword){
  return await bcrypt.compare(curVal,hashedPassword);
}