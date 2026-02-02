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
        },
        meal:{type:Number,
            default:0
        },
        remmoney:{type:Float16Array,
            default:0
        },
        mealrate:{type:Float16Array,
            default:0
        }, 
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