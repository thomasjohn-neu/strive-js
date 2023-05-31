import mongoose from "mongoose";

const Schema = new mongoose.Schema({
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
    completionProgressPercentage: {
        type: Number,
        required: false,
        allowNull: true
    },

    totalTimeSpentPercentage: {
        type: Number,
        required: false,
        allowNull: true
    },

    totalCompletetedTime:{
        type: Number,
        required: false,
        allowNull: true
    },

    totalTargetedTime:{
        type: Number,
        required: false,
        allowNull: true
    },
    totalTargetedTasks:{
        type: Number,
        required: false,
        allowNull: true
    },
    totalCompletedTasks:{
        type: Number,
        required: false,
        allowNull: true
    }
},
    {
    collection: 'Dashboard'
    ,skipVersioning:true}    
);



// Schema.index({ userId: "1", challengeId: "1" }, { unique: true });
const Dashboard = mongoose.model("Dashboard", Schema);
export default Dashboard;