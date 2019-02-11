const express = require('express') // import express
const mongoose = require('mongoose') // Import mongoose for MongoDB
const app = express()
const bodyParser = require("body-parser");
const port = 3000

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

db.on('error', console.error.bind(console, 'connection error:')); // Error for connection problems
db.once('open', function callback () {
    console.log('Conntected To Mongo Database');
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/temperature',function(req,res){
    var timestamp_=req.body.timestamp;
    var value_=req.body.value;
    
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
                var dbo = db.db("SensorMeasurements")
                myObj = {timestamp : timestamp_,
                         value: value_}
                dbo.collection(temperature_measurements).insertOne(myObj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
        db.close();
        });
    });
    console.log("timestamp = "+timestamp+", value "+value);

    res.end("yes");
});

app.post('/ph',function(req,res){
    var timestamp=req.body.timestamp;
    var value=req.body.value;
    console.log("timestamp = "+timestamp+", value "+value);
    res.end("yes");
});

app.post('/waterLevel',function(req,res){
    var timestamp=req.body.timestamp;
    var value=req.body.value;
    console.log("timestamp = "+timestamp+", value "+value);
    res.end("yes");
});

app.post('/ambientTemp',function(req,res){
    var timestamp=req.body.timestamp;
    var value=req.body.value;
    console.log("timestamp = "+timestamp+", value "+value);
    res.end("yes");
});

app.post('/ic',function(req,res){
    var timestamp=req.body.timestamp;
    var value=req.body.value;
    console.log("timestamp = "+timestamp+", value "+value);
    res.end("yes");
});

app.post('/waterPump',function(req,res){
    var timestamp=req.body.timestamp;
    var value=req.body.value;
    console.log("timestamp = "+timestamp+", value "+value);
    res.end("yes");
});

app.post('/dosingPump',function(req,res){
    var timestamp=req.body.timestamp;
    var value=req.body.value;
    console.log("timestamp = "+timestamp+", value "+value);
    res.end("yes");
});

app.post('/servoActions',function(req,res){
    var timestamp=req.body.timestamp;
    var value=req.body.value;
    console.log("timestamp = "+timestamp+", value "+value);
    res.end("yes");
});

app.listen(3000,function(){
    console.log("Started on PORT 3000");
})