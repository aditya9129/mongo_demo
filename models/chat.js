const mongoose = require('mongoose');
const chatSchema =new mongoose.Schema({
    to:{
        type:String,
        required:true,
    },
    from:{
        type:String,
        required:true,
    },
    msg:{
        type:String,
        maxLength:50,
    },
    created_at:{
        type:Date,
        required:true,
    }
});
const chat=mongoose.model("chat",chatSchema);
module.exports=chat;