import express from "express";
import *  as challengeLogController from '../controllers/challengeLog-controller.js';
import {authenticate,verifyToken} from './../security/authentication.js';
const router  = express.Router();


//challengeLog related paths
router.route('/')
.post(authenticate,challengeLogController.createChallengeLog)
//todo : Check the below line
//.post(verifyToken,challengeLogController.createChallengeLog)
//.post(authenticate, challengeLogController.createChallengeLog)
.put(authenticate,challengeLogController.updateChallengeLog)
.delete(authenticate,challengeLogController.deleteChallengeLog);

router.route('/:challenge_id')
.get(authenticate,challengeLogController.getAllChallengeLogsByChallengeId);

router.route('/extension/')
.post(challengeLogController.createChallengeLogExtension)

router.route('/:id')
.get(authenticate,challengeLogController.getChallengeLogByLogId);

export default router;
