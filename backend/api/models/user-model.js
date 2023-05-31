import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  first_name:{
    type:String,
    required:"First Name is required"
  },
  last_name:{
    type:String,
    required:"Last Name is required"
  },
  username:{
    type:String,
    required:"username is required"
  },
  password:{
    type:String,
    required:"Password is required"
  },
  created_time:{
    type:Date,
    default:Date.now
  },
  updated_time:{
    type:Date,
    default:Date.now
  }
},{
  collection: 'User'
,skipVersioning:true});

// // Duplicate the ID field.
// Schema.virtual('id').get(function(){
//   return this._id.toHexString();
// });

//deleting unnecessary fields in response
Schema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) { delete ret.__v }
});
const User = mongoose.model('User',Schema);
export default User;