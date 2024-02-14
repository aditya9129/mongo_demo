const express=require("express");
const app=express();
const path=require("path");
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"views")));
var methodOverride = require('method-override')
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
const Chat=require("./models/chat.js");
const port=8000;
const mongoose = require('mongoose');
main().then(console.log("sucess")).catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

}

app.get("/",(req,res)=>{
    res.send("working");
})
app.get("/chat",async (req,res)=>{ 
 let chats=await Chat.find();
 res.render("index.ejs",{chats});
})
app.get("/chat/new",async (req,res)=>{ 
    res.render("new.ejs");
 })
 app.post("/chat/new",(req,res)=>{ 
    let {from,to,msg}=req.body;
    if (!from || !to || !msg) {
        res.redirect("/chat");
    }
    else{
    let newchat =new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
    })
    newchat.save();
}
    res.redirect("/chat");
})
app.get("/chat/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
})
app.patch("/chat/:id",async (req,res)=>{
    let {id}=req.params;
    let updatedchat=await Chat.findByIdAndUpdate(id,{msg:req.body.updated_msg});
    res.redirect("/chat")
})
app.delete("/chat/:id",async (req,res)=>{
    let {id}=req.params;
    let updatedchat=await Chat.findByIdAndDelete(id);
    res.redirect("/chat")
})

app.listen(port);



















// const userSchema =new mongoose.Schema({

//     //read schema validations ex-not null in sql===required=true
//     //https://mongoosejs.com/docs/
//    name:String,
//    age:Number,
// });
// const User=mongoose.model("User",userSchema);
//  //   ^-model               ^-collection name =user(s)
// // const user1=new User({
// //     name:"aggarwal",
// //     age:21,
// // })
// // user1.save(); //returns promise
// User.find({}).then((res)=>{  //not a promise
//     console.log(res);
// }).catch((err)=>console.log(err));