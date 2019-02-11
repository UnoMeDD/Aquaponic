import time
from SerialEmulator import SerialEmulator

emulator = SerialEmulator('./ttydevice','./ttyACM0') 

def sendFromSerialDevice(strData):
    emulator.write(strData + '\n')
    print 'Sent "' + strData + '" from virtual serial device.'

while True:
    sendFromSerialDevice('temperature:18.1')
    time.sleep(5)
    sendFromSerialDevice('ph:5')
    time.sleep(5)
    sendFromSerialDevice('waterLevel:56')
    time.sleep(5)
    sendFromSerialDevice('ambientTemp:21')
    time.sleep(5)
    sendFromSerialDevice('ic:3')
    time.sleep(5)
    sendFromSerialDevice('waterPump:1')
    time.sleep(5)
    sendFromSerialDevice('dosingPump:0')
    time.sleep(5)
    sendFromSerialDevice('servoActions:3')
    time.sleep(5)

    