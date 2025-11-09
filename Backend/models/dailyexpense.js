const mongoose =require('mongoose')
const dailyexpenseSchema =new mongoose.Schema({
    messId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Mess'
    }],
    expenses:[{
        name:{type:String,
        
        enum:['meat','vagetables','other'],
        },
        cost:{
            type:Number,
        }
    }]
})