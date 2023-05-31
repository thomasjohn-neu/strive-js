import mongoose from "mongoose";
import User from "./user-model.js";


const challengeParticipantsSchema = new mongoose.Schema({
    challengeId: {
        type: String,
        required: true,
        allowNull: false,
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        allowNull: false,
    }]
},
{
    // participants : [User],
    collection: 'ChallengeParticipants',
    skipVersioning:true
});

const ChallengeParticipants = mongoose.model("ChallengeParticipants", challengeParticipantsSchema);
export default ChallengeParticipants;

