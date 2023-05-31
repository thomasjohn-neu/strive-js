import mongoose from "mongoose";

//TODO : Create the Schema for Challenge Log Model

//Parameters:
// 1. challengeId : The id of the challenge that the user is logging
// 2. userId : The id of the user that is logging the challenge
// 3. challengeType : The type of challenge that the user is logging
// 4. logDateTime : The date that the user is logging the challenge
// 5. activityStartTime : The start time of the activity that the user is logging
// 6. activityEndTime : The end time of the activity that the user is logging
// 7. activityDuration : The duration of the activity that the user is logging
// 8. activityNotes : The notes that the user is logging for the activity
// 9. activityStatus : The status of the activity that the user is logging

const challengeLogSchema = new mongoose.Schema({
    challengeId: {
        type: String,
        ref: "Challenge",
        required: true,
        allowNull: false,
    },
    userId: {
        type: String,
        ref: "User",
        required: true,
        allowNull: false,
    },
    topic: {
        type: String,
        required: false,
        allowNull: true
    },
    challengeType: {
        type: String,
        required: true,
        allowNull: false,
    },
    logDateTime: {
        type: Date,
        required: true,
        allowNull: false,
        default: Date.now,
    },
    activityStartTime: {
        type: Date,
        required: true,
        allowNull: false,
    },
    activityEndTime: {
        type: Date,
        required: true,
        allowNull: false,
    },
    activityDuration: {
        type: Number,
        required: true,
    },
    activityNotes: {
        type: String,
        required: false,
    },
    activityCompletionStatus: {
        type: Boolean,
        required: true,
        allowNull: false,
        default: false
    },
    activityTime: {
        type: String,
        required: false
    },
    isReminderNeeded: {
        type: Boolean,
        default: false,
        required: false
    },   
    oneDayReminder:{
        type:Boolean,
        default:false,
        required:false
    },
    sevenDayReminder:{
        type:Boolean,
        default:false,
        required:false
    },
    thiryDayReminder:{
        type:Boolean,
        default:false,
        required:false
    }
    // add a reminderRequired boolean field
    // function will read entries from this table where created time matches our need and reminder true
    // select from log table where remidner=true & cretaedtime>=(currenttime-24hour) and lte <= (curretntime-24hour+5 min)
},
    {
    collection: 'ChallengeLog',
    skipVersioning:true});

const ChallengeLog = mongoose.model("ChallengeLog", challengeLogSchema);

export default ChallengeLog;
