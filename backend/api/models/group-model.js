import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    groupName:{
      type:String,
      required:"Group Name is required"
    },
    groupEmail:{
      type:Array,
      required:"Group Email is required"
    },
    groupUsers:{
      type:Array,
      required:false
    },
    createdTime:{
      type:Date,
      default:Date.now
    },
    updatedTime:{
      type:Date,
      default:Date.now
    },
    createdBy:{
        type: String,
        required:"User who created is required",
        notNull:true
    }
  },{
    collection: 'Group'
  ,skipVersioning:true});
  
  // Duplicate the ID field.
  Schema.virtual('id').get(function(){
    return this._id.toHexString();
  });
  
  //deleting unnecessary fields in response
  Schema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) { delete ret._id ;delete ret.__v }
  });
  const Group = mongoose.model('Group',Schema);
  export default Group;