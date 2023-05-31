import { Group } from "../models/index.js";

/**
 * Creates a new Group
 * @param {Group} GroupData - New Group that needs to be created
 */
export const createGroup = async (GroupData)=> {
    const group = new Group(GroupData);
    //In Participants table , map the user to challenge 
    return group.save(); 
}

export const getAllGroups = async ()=>{
    const groups = await Group.find().exec();
    return groups;
  }
