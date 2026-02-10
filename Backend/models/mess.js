const mongoose = require('mongoose');
const messSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{type:String},
    members:[{
        id:{type:mongoose.Schema.Types.ObjectId,
        ref:'User'},
        name:String,
        meal:{type:Number,
            default:0
        },
        remmoney:{type:mongoose.Schema.Types.Decimal128,
            default:0
        },
        mealrate:{type:mongoose.Schema.Types.Decimal128,
            default:0
        },
    }],
    managerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    dailyexpense:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'DailyExpense'
    }],
    totalExpense:{
        type: Number,
        get: v => v.toFixed(2),
        set: v => parseFloat(v),
        default: 0.00
    },
    messFund:[
        {
            memberId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
            amount:{
                type: Number,
                get: v => v.toFixed(2),
                set: v => parseFloat(v),
                default: 0.00
            },
            date:{
                type:Date,
                default:Date.now,
                get: function(date) {
                    return date ? date.toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit'
                    }).split('/').join('.') : '';
                }
            }   
        }
    ],
    perHeadCost:{
        type: Number,
        get: v => v.toFixed(2),
        set: v => parseFloat(v),
        default: 0.00
    }
})

// Enable getters for the schema
messSchema.set('toJSON', { getters: true });
messSchema.set('toObject', { getters: true });

module.exports = mongoose.model('Mess', messSchema);