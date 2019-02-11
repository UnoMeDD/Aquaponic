import serial
import time
import datetime
import requests
from pymongo import MongoClient

client = MongoClient('localhost:27017')
adress = open("url.txt", "r")
url = adress.read()

db = client.SensorMeasurements

tempListe = []
ser = serial.Serial('/Users/dominicduda/Desktop/Project Simulation/virtual_serial_device/ttyACM0', 9600) # Serial Emulator
while True:
    rawString = str(ser.readline()) # reads current sensor value
    rawString = rawString.rstrip('\n') # cuts the string at the space
    sensorType = rawString.split(":")[0] # cuts the ":"
    
    measurementValueStr = rawString.split(":")[1] # "18.2"
    measurementValue = float(measurementValueStr) # 18.2
    currentTimeStampEpoch = time.time()*1000 # time * 1000 to be on the same unix time as javascript

    #currentTimeStamp = datetime.datetime.fromtimestamp(currentTimeStampEpoch).strftime('%Y-%m-%d %H:%M:%S')

    print '[' + str(currentTimeStampEpoch) + '] Sensor type: ' + sensorType + ' --> Value: ' + str(measurementValue)

    if sensorType == "temperature":
        while True:
            collection = {'timestamp' : currentTimeStampEpoch,
                          'value': measurementValue}
            try:
                res = requests.post('+url+temperature', json=collection)
                res.json()
            except:
                print "connection failed"
            break
            
    # db.temperature_measurements.insert_one({ # adds position in SensorMeasurments/ temperature_measurments
    #  "timestamp": currentTimeStampEpoch, # current unix timestamp
    #  "value": measurementValue # current sensor value
    #})

    if sensorType == "ph":
        while True:
            collection = {'timestamp' : currentTimeStampEpoch,
                          'value': measurementValue}
            try:
                res = requests.post('+url+ph', json=collection)
                res.json()
            except:
                print "connection failed"
            break   
    
    #    db.ph_measurements.insert_one({ # adds position in SensorMeasurments/ ph_measurments
    #        "timestamp": currentTimeStampEpoch, # current unix timestamp
    #        "value": measurementValue # current sensor value
    #    })

    if sensorType == "waterLevel":
        while True:
            collection = {'timestamp' : currentTimeStampEpoch,
                          'value': measurementValue}
            try:
                res = requests.post('+url+waterLevel', json=collection)
                res.json()
            except:
                print "connection failed"
            break
    
    #    db.waterLevel.insert_one({ # adds position in SensorMeasurments/ waterLevel
    #        "timestamp": currentTimeStampEpoch, # current unix timestamp
    #        "value":measurementValue # current sensor value
    #    })

    if sensorType == "ambientTemp":
        while True:
            collection = {'timestamp' : currentTimeStampEpoch,
                          'value': measurementValue}
            try:
                res = requests.post('+url+ambientTemp', json=collection)
                res.json()
            except:
                print "connection failed"
            break
 
    #    db.ambientTemperature.insert_one({ # adds position in SensorMeasurments/ ambient Temperature
    #        "timestamp": currentTimeStampEpoch, # current unix timestamp
    #        "value": measurementValue # current sensor value
    #    })
    
    if sensorType == "ic":
        while True:
            collection = {'timestamp' : currentTimeStampEpoch,
                          'value': measurementValue}
            try:
                res = requests.post('+url+ic', json=collection)
                res.json()
            except:
                print "connection failed"
            break
      
    #    db.ic_measurements.insert_one({ # adds position in SensorMeasurments/ ic_measurments
    #       "timestamp": currentTimeStampEpoch, # current unix timestamp
    #        "value": measurementValue # current sensor value
    #    })
    
    if sensorType == "waterPump":
        while True:
            collection = {'timestamp' : currentTimeStampEpoch,
                          'value': measurementValue}
            try:
                res = requests.post('+url+waterPump', json=collection)
                res.json()
            except:
                print "connection failed"
            break
      
    #    db.waterPump.insert_one({ # adds position in SensorMeasurments/ ic_measurments
    #        "timestamp": currentTimeStampEpoch, # current unix timestamp
    #        "value": measurementValue # current sensor value
    #    })

    if sensorType == "dosingPump":
        while True:
            collection = {'timestamp' : currentTimeStampEpoch,
                          'value': measurementValue}
            try:
                res = requests.post('+url+dosingPump', json=collection)
                res.json()
            except:
                print "connection failed"
            break
    
    #    db.dosingPump.insert_one({ # adds position in SensorMeasurments/ ic_measurments
    #        "timestamp": currentTimeStampEpoch, # current unix timestamp
    #        "value": measurementValue # current sensor value
    #    })

    if sensorType == "servoActions":
        while True:
            collection = {'timestamp' : currentTimeStampEpoch,
                          'value': measurementValue}
            try:
                res = requests.post('+url+servoActions', json=collection)
                res.json()
            except:
                print "connection failed"
            break
      
    #    db.servoActions.insert_one({ # adds position in SensorMeasurments/ ic_measurments
    #        "timestamp": currentTimeStampEpoch, # current unix timestamp
    #        "value": measurementValue # current sensor value
    #    })