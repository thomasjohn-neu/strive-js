import express from "express";
import *  as GroupController from '../controllers/group-controller.js';
import {authenticate} from '../security/authentication.js';
const router  = express.Router();

//challenge related paths
router.route('/')
.post(authenticate, GroupController.createGroup)
.get(authenticate,GroupController.getAllGroups)

export default router;