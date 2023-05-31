import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    challengeName:{
      type:String,
      required:"Challenge Name is required",
      notNull:true
    },
    challengeType:{
      //study, fitness, lifestyle
      type:String,
      required:"Challenge Type is required",
      notNull:true
    },
    challengeFrequency:{
      //daily, weekly, monthly
      type:String,
      required:"Challenge Frequency is required",
      notNull:true
    },
    challengeDescription:{
      type:String,
    },
    tags:{
        type:String,
      },
    privacy:{
      type:String,
      required:"Privacy is required",
      notNull:true
    },
    group: {
      type:String,
      required: false,
      notNull: false
    },
    startDate:{
    type:Date,
    required:"Start Date is required",
    notNull:true
    },
    endDate:{
        type:Date,
        required:"End Date is required",
        notNull:true
        },
    createdTime:{
      type:Date,
      default:Date.now
    },
    updatedTime:{
      type:Date,
      default:Date.now
    },
    studyChallengeData:{
        type: JSON
    }, 
    //added challenge owner userId
    owneruserId:{
      type:String,
      required:"Owner User Id is required",
      notNull:true
    },
    // total tagetted time in minutes
    totalTargetTime:{
      type: Number,
      required: true,
      notNull: true
    },
    totalTopics: {
      type: Number,
      required: false,
      notNull: false
    }
  },
  {
    collection: 'Challenge'
  ,skipVersioning:true});
  
  // Duplicate the ID field.
  Schema.virtual('id').get(function(){
    return this._id.toHexString();
  });
  
  //deleting unnecessary fields in response
  Schema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {   delete ret._id ;delete ret.__v }
  });

  const Challenge = mongoose.model('Challenge',Schema);
  export default Challenge;