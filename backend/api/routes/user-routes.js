import express from "express";
import *  as userController from '../controllers/user-controller.js';
import {authenticate} from './../security/authentication.js';
const router  = express.Router();

//user related paths
router.route('/')
.post(userController.createUser)
.get(authenticate,userController.getUser)
.put(authenticate,userController.updateUser);

router.route('/signin')
.post(userController.signIn);

export default router;