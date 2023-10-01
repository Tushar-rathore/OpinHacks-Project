var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/tutorialsPoint');  //localhost is used instead of mongoDB atlas due to lack of time so we are taking it in a localhost 
// for example this is a set of data received by sign up page
// {
//   "_id": {
//    "$oid": "65189e58f604e6b4de997988"
//  },
//  "name": "Tushar Rathore",
//  "email": "rc@rungta.ac.in",
//  "password": "123",
//  "phone": "09302085642"
// }
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
   console.log("connection succeeded");
})
var app=express()

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
   extended: true
})); 

app.post('/sign_up', function(req,res){
   var name = req.body.name;
   var email =req.body.email;
   var pass = req.body.password;
   var phone =req.body.phone;

   var data = {
      "name": name,
      "email":email,
      "password":pass,
      "phone":phone
   }
   db.collection('details').insertOne(data,function(err, collection){
   if (err) throw err;
      console.log("Record inserted Successfully");
   });
   return res.redirect('success.html');
})

app.get('/',function(req,res){
   res.set({
      'Access-control-Allow-Origin': '*'
   });
   return res.redirect('index.html');
}).listen(3000)

console.log("server listening at port 3000");
