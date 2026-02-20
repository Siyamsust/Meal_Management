const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
    ,
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mess:{
          id:{type:mongoose.Schema.Types.ObjectId,
        ref:'Mess'},
        name:{
            type:String,
        }
     
},
    imageUrl:{
        type:String,
    },
    isManager:{
    type:Boolean,
    default:false
   } 

})
module.exports =mongoose.model('User',userSchema);