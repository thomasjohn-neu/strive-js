import express from "express";
import *  as challengeController from '../controllers/challenge-controller.js';
import {authenticate} from './../security/authentication.js';
const router  = express.Router();

//challenge related paths
router.route('/')
.post(authenticate, challengeController.createChallenge)
.get(authenticate,challengeController.getAllChallenges)

router.route('/extension/')
.get(challengeController.getAllChallengesStudy)

router.route('/:id')
.get(authenticate,challengeController.getChallengeById)
.put(authenticate,challengeController.updateChallenge)
.delete(authenticate,challengeController.deleteChallenge);


export default router;