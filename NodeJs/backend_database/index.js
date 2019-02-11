const express = require('express') // import express
const mongoose = require('mongoose') // Import mongoose for MongoDB
const app = express()
const port = 3000 // Port for Local tests

var Schema = mongoose.Schema // structures a mongoose schema

mongoose.connect('mongodb://localhost:27017/SensorMeasurements', { useNewUrlParser: true }); // Connects to the MongoDB Database

var db = mongoose.connection 
db.on('error', console.error.bind(console, 'connection error:')); // Error for connection problems
db.once('open', function callback () {
    console.log('Conntected To Mongo Database');
})

var temperatureMeasurementSchema = new Schema({ // MongoDB Schema for the temperature Database
    timestamp: Number,
    value: Number
}, {collection: 'temperature_measurements'})

var phMeasurementSchema = new Schema({ // MongoDB Schema for the pH Database
    timestamp: Number,
    value: Number
}, {collection: 'ph_measurements'})

var waterLevelSchema = new Schema({ // MongoDB Schema for the pH Database
    timestamp: Number,
    value: Number
}, {collection: 'waterLevel'})

var ambientTemperatureSchema = new Schema({ // MongoDB Schema for the pH Database
    timestamp: Number,
    value: Number
}, {collection: 'ambientTemperature'})

var icMeasurementSchema = new Schema({ // MongoDB Schema for the pH Database
    timestamp: Number,
    value: Number
}, {collection: 'ic_measurements'})


var TemperatureMeasurementModel = mongoose.model('TemperatureMeasurement', temperatureMeasurementSchema) 
var pHMeasurementModel = mongoose.model('pHMeasurements', phMeasurementSchema)// variable for the MongoDB Database Model
var waterLevelModel = mongoose.model('waterLevel', waterLevelSchema)
var ambientTemperatureModel = mongoose.model('ambientTemperature', ambientTemperatureSchema)
var icMeasurementModel = mongoose.model('ic_measurements', icMeasurementSchema)
var waterPump = mongoose.model('waterPump', waterLevelSchema)
var dosingPumpModel = mongoose.model('dosingPump', ambientTemperatureSchema)
var servoActionsModel = mongoose.model('servoActions', icMeasurementSchema)


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/temperature', (req, res) => {
    let timespan = req.query.timespan

    let currentTimeStamp =  Math.round(new Date().getTime() / 1000)
    var endtimeStamp = 0

    if (timespan == '24h') {
        endtimeStamp = currentTimeStamp - (24 * 60 * 60)
    } else if (timespan == '12h' ) {
        endtimeStamp = currentTimeStamp - (12 * 60 * 60)
    } else if (timespan == '3d') {
        endtimeStamp = currentTimeStamp - (24 * 60 * 60 * 3)
    }

    TemperatureMeasurementModel.find({ 
        "timestamp" : { //Searches for timestamp in the TemperatureMeasurement Model
            $lt: new Date(), 
            $gte: new Date(endtimeStamp)}
        }, function(err, docs){

    console.log('Request: ' + timespan + ' Returned ' + String(data.length) + ' values with timestamps.')

    res.send(docs)
    })
});

app.get('/ph', (req, res) => {
    let timespan = req.query.timespan

    let currentTimeStamp =  Math.round(new Date().getTime() / 1000)
    var endtimeStamp = 0

    if (timespan == '24h') {
        endtimeStamp = currentTimeStamp - (24 * 60 * 60)
    } else if (timespan == '12h' ) {
        endtimeStamp = currentTimeStamp - (12 * 60 * 60)
    } else if (timespan == '3d') {
        endtimeStamp = currentTimeStamp - (24 * 60 * 60 * 3)
    }

    pHMeasurementModel.find({ 
        "timestamp" : { //Searches for timestamp in the TemperatureMeasurement Model
            $lt: new Date(), 
            $gte: new Date(endtimeStamp)}
        }, function(err, docs){

    console.log('Request: ' + timespan + ' Returned ' + String(data.length) + ' values with timestamps.')

    res.send(docs)
    })
});

app.get('/waterLevel', (req, res) => {
    let timespan = req.query.timespan

    let currentTimeStamp =  Math.round(new Date().getTime() / 1000)
    var endtimeStamp = 0

    if (timespan == '24h') {
        endtimeStamp = currentTimeStamp - (24 * 60 * 60)
    } else if (timespan == '12h' ) {
        endtimeStamp = currentTimeStamp - (12 * 60 * 60)
    } else if (timespan == '3d') {
        endtimeStamp = currentTimeStamp - (24 * 60 * 60 * 3)
    }

    waterLevelModel.find({ 
        "timestamp" : { //Searches for timestamp in the TemperatureMeasurement Model
            $lt: new Date(), 
            $gte: new Date(endtimeStamp)}
        }, function(err, docs){

    console.log('Request: ' + timespan + ' Returned ' + String(data.length) + ' values with timestamps.')

    res.send(docs)
    })
});

app.get('/ambientTemp', (req, res) => {
    let timespan = req.query.timespan

    let currentTimeStamp =  Math.round(new Date().getTime() / 1000)
    var endtimeStamp = 0

    if (timespan == '24h') {
        endtimeStamp = currentTimeStamp - (24 * 60 * 60)
    } else if (timespan == '12h' ) {
        endtimeStamp = currentTimeStamp - (12 * 60 * 60)
    } else if (timespan == '3d') {
        endtimeStamp = currentTimeStamp - (24 * 60 * 60 * 3)
    }

    ambientTemperatureModel.find({ 
        "timestamp" : { //Searches for timestamp in the TemperatureMeasurement Model
            $lt: new Date(), 
            $gte: new Date(endtimeStamp)}
        }, function(err, docs){

    console.log('Request: ' + timespan + ' Returned ' + String(data.length) + ' values with timestamps.')

    res.send(docs)
    })
});

app.get('/ic', (req, res) => {
    let timespan = req.query.timespan

    let currentTimeStamp =  Math.round(new Date().getTime() / 1000)
    var endtimeStamp = 0

    if (timespan == '24h') {
        endtimeStamp = currentTimeStamp - (24 * 60 * 60)
    } else if (timespan == '12h' ) {
        endtimeStamp = currentTimeStamp - (12 * 60 * 60)
    } else if (timespan == '3d') {
        endtimeStamp = currentTimeStamp - (24 * 60 * 60 * 3)
    }

    icMeasurementModel.find({ 
        "timestamp" : { //Searches for timestamp in the TemperatureMeasurement Model
            $lt: new Date(), 
            $gte: new Date(endtimeStamp)}
        }, function(err, docs){

    console.log('Request: ' + timespan + ' Returned ' + String(data.length) + ' values with timestamps.')

    res.send(docs)
    })
});

app.get('/waterPump', (req, res) => {
    let timespan = req.query.timespan

    let currentTimeStamp =  Math.round(new Date().getTime() / 1000)
    var endtimeStamp = 0

    if (timespan == '24h') {
        endtimeStamp = currentTimeStamp - (24 * 60 * 60)
    } else if (timespan == '12h' ) {
        endtimeStamp = currentTimeStamp - (12 * 60 * 60)
    } else if (timespan == '3d') {
        endtimeStamp = currentTimeStamp - (24 * 60 * 60 * 3)
    }

    waterPump.find({ 
        "timestamp" : { //Searches for timestamp in the TemperatureMeasurement Model
            $lt: new Date(), 
            $gte: new Date(endtimeStamp)}
        }, function(err, docs){

    console.log('Request: ' + timespan + ' Returned ' + String(data.length) + ' values with timestamps.')

    res.send(docs)
    })
});

app.get('/dosingPump', (req, res) => {
    let timespan = req.query.timespan

    let currentTimeStamp =  Math.round(new Date().getTime() / 1000)
    var endtimeStamp = 0

    if (timespan == '24h') {
        endtimeStamp = currentTimeStamp - (24 * 60 * 60)
    } else if (timespan == '12h' ) {
        endtimeStamp = currentTimeStamp - (12 * 60 * 60)
    } else if (timespan == '3d') {
        endtimeStamp = currentTimeStamp - (24 * 60 * 60 * 3)
    }

    dosingPumpModel.find({ 
        "timestamp" : { //Searches for timestamp in the TemperatureMeasurement Model
            $lt: new Date(), 
            $gte: new Date(endtimeStamp)}
        }, function(err, docs){

    console.log('Request: ' + timespan + ' Returned ' + String(data.length) + ' values with timestamps.')

    res.send(docs)
    })
});

app.get('/servoActions', (req, res) => {
    let timespan = req.query.timespan

    let currentTimeStamp =  Math.round(new Date().getTime() / 1000)
    var endtimeStamp = 0

    if (timespan == '24h') {
        endtimeStamp = currentTimeStamp - (24 * 60 * 60)
    } else if (timespan == '12h' ) {
        endtimeStamp = currentTimeStamp - (12 * 60 * 60)
    } else if (timespan == '3d') {
        endtimeStamp = currentTimeStamp - (24 * 60 * 60 * 3)
    }

    servoActionsModel.find({ 
        "timestamp" : { //Searches for timestamp in the TemperatureMeasurement Model
            $lt: new Date(), 
            $gte: new Date(endtimeStamp)}
        }, function(err, docs){

    console.log('Request: ' + timespan + ' Returned ' + String(data.length) + ' values with timestamps.')

    res.send(docs)
    })
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
