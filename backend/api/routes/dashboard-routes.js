import express from "express";
import *  as challengeController from '../controllers/challenge-controller.js';
import {authenticate} from './../security/authentication.js';
const router  = express.Router();
import * as dashboardController from '../controllers/dashboard-controller.js';


//challenge related paths
router.route('/')
.get(authenticate,dashboardController.getDashboardDetails)

router.route('/:groupChallengeId')
.get(authenticate,dashboardController.getDashboardDetailsByChallengeId)
export default router;

