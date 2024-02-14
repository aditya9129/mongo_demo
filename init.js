//just to add demo data
const mongoose = require('mongoose');
main().then(console.log("success")).catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}
const Chat=require("./models/chat.js");
let data=[{
    to:"agg",
    from:"aditya",
    msg:"hello",
    created_at:new Date(),
},
{
    to:"agg",
    from:"rahul",
    msg:"hi",
    created_at:new Date(),
},
{
    to:"warner",
    from:"smesh",
    msg:"hello",
    created_at:new Date(),
},
{
    to:"gelm",
    from:"maxwell",
    msg:"hello",
    created_at:new Date(),
},
]
Chat.insertMany(data);