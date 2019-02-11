  /*  !!!!!DON'T RESTART OR TURN OFF WHILE STEPPERMOTOR IS MOVING!!!!!
   *   
   * StepperMotor step angle 5.625 x 1/64     6
   * includes:  pH measurement&control
   *            temperature measurement
   *            waterlvl measurement&control
   *            EC-measurement
   *            robo-arm control
   *            
   * Serialprint -->  alarmstatus: 0 = Low alart
   *                              1 = O.K.
   *                              2 = High alert
   *                  arm-positions: 1 = storage
   *                                 2 = flush before measurement
   *                                 3 = measurement
   *                                 4 = flush after measurement 
   */
  
  #include <EEPROM.h>
  #include <CheapStepper.h> // moved  int stepN from private to public
  
  #define tempPower 2   // Power supply Pin for temperature measurement
  #define tempPin A2    // Analog Pin for temperature measurement
  #define ECPower 3    // Power supply Pin for EC- measurement
  #define ECPin A3      // Analog Pin for EC-measurement
  #define phRead A0     // Analog Pin for pH-measurement
  #define trigPin 7     //supersonic sensor Trigger-pin
  #define echoPin 6     //supersonic sensor echo-pin
  #define valve 8       // pin for fresh water valve
  #define dosPump 9     // Pin for dosing pump
  #define waterPump A5   // Pin for waterpump
                        /* Pin Relay shield:  pin 7 --> relay1
                                              pin 6 --> relay2
                                              pin 5 --> relay3
                                              pin 4 --> relay4 */
                                              
  CheapStepper rotateStepper(34,35,36,37);  //Stepper pins for rotation stepper
  CheapStepper liftStepper(30,31,32,33);    //Stepper pins for lift stepper
  bool initRoboArm = 0; // set to 1 for init Roboarm while pH-sensor is sank in storage solution
  
  float avgVoltage=0; //reset average voltage
  float val[20]; //store ADC values
  float temp; //temporary for bubblesort             
  const float inputVoltage=5.09;
  const int R1_EC = 876; // +25ohm resistance of digitalPin
  float EC=0;   //electric conductivity at current temperature
  float EC25 = 0;   //electric conductivity at 25°C
  float ecResistance= 0;  // measured resistance of liquid
  const float temperatureCoef = 0.019;  //temperature coefficient of water
  float ecCellConstant = 1.08; //adjustment factor: 1.76 for EU plugs 
  
  unsigned long currentMillis=0;  // stores current value of Millis() for period-setting
  unsigned long preTempMillis=0;  //stores previous value of Millis() for temperature measurement period-setting
  unsigned long prePhMillis = 0;  //stores previous value of Millis() for pH-measurement period-setting
  unsigned long preWaterPumpMillis=0; //  stores previous value of Millis() for waterpump
  unsigned long preWaterlvlMillis=0; //  stores previous value of Millis() for measurement of waterlvl
  unsigned long waterPumpStopMillis=0; // stores Millis of time when waterpump stops --> for waterlvl-ontrol
  bool pumpState = false; // state of waterpump --> TRUE if turned ON
  unsigned long waterlvlCtrlDelay = 900000; // delay for waterlvl-measurement after using of waterpump --> 15min

  byte lastPosition;    // stores last position of rotate stepper
  const unsigned int liftEEPROM = 510;    //EEPROM adress for lift stepper motor position
  const unsigned int rotateEEPROM = 511;  //EEPROM adress for rotate stepper motor position
  bool mvCW = true; //move ClockWise --> false= move Counter Clockwise
  unsigned int sonicsensorRange=60; // distance between sensor and ground of aquarium
  double duration, waterlvl;
  
  const float setPh = 6.8;    // required pH-value
  const float waterlvl_min = 15.0, waterlvl_max = 10.0; //
  const float temp_min = 15.0, temp_max = 17.0; //temperature-alarmlevels
  const float ph_min = 6.6, ph_max = 7.0; //pH alarmlevels
  
  void setup() {
    Serial.begin(9600);
    pinMode(tempPin, INPUT);
    pinMode(tempPower, OUTPUT); //Setting pin for sourcing current
    digitalWrite(tempPower, LOW);
    pinMode(ECPin,INPUT);
    pinMode(ECPower,OUTPUT);  //Setting pin for sourcing current
    digitalWrite(ECPower, LOW);
    pinMode(phRead,INPUT);
    pinMode(dosPump,OUTPUT);
    pinMode(trigPin, OUTPUT);
    pinMode(echoPin, INPUT);
    pinMode(valve, OUTPUT);
    digitalWrite(valve, LOW);
    
    //RPM range:(10rpm - 22rpm) --> rpm <6 may overheat, rpm >24 may skip
    rotateStepper.setRpm(10);
    liftStepper.setRpm(10);
    initArm();
    rotateStepper.stepN = getLastPosition(rotateEEPROM); //stepN preload from EEPROM for rotate stepper
    liftStepper.stepN = getLastPosition(liftEEPROM);     // stepN preload from EEPROM for lift stepper
    delay(2000);
    Serial.print("Stepper position: ");
    printRotatePosition(rotateStepper.stepN);
  }
  
  void loop() {                                                    //  _________----------____________------------------
    currentMillis = millis();
    //waterPumpCtrl(15,45);
    getTemp(5);
    //getEC(getTemp(0));
    //phMeasureAndControl(0);
    //getWaterlvl(1);
    
  }
  
  void initArm(){
    if(initRoboArm==1){
      EEPROM.write(liftEEPROM,1);
      delay(50);
      EEPROM.write(rotateEEPROM,1);
      delay(50);
    }
  }
  
            ////////////////////////////////////////
            ////////temperature measurement/////////
            ////////////////////////////////////////
  
    float getTemp(unsigned int interval){  //interval in seconds
      float temperature;
      float sensorResistance;
      const int r1_temp=10395; // <-- resistor for voltage divider (25 Ohm pinResistance included)
      interval *= 1000;
    
     if((currentMillis - preTempMillis) > interval){  //starts function after the time for the interval is gone.
        preTempMillis = currentMillis;
        digitalWrite(tempPower, HIGH); //turn ON/OFF power to avoid sensor-heatening by itself
        delay(100);
        
        for(int i=0;i<20;i++){   //loop to write values to array
          val[i]=analogRead(tempPin);
          }
        
        //digitalWrite(tempPower, LOW);
        for(int i=0;i<19;i++){     //Bubblesort
          for(int j=i+1;j<20;j++){
            if(val[i]>val[j]){
              temp=val[i];
              val[i]=val[j];
              val[j]=temp;
            }
          }
        }
      
        for(int i=5;i<15;i++){   //cut peaks
          avgVoltage+=val[i];
          }
      
        avgVoltage /= 10;   // calculate average value
        avgVoltage = avgVoltage*(inputVoltage/1024.0);  // calculate voltage from average analogRead value
        Serial.print("Spannung: ");
        Serial.println(avgVoltage,4);
        
        temperature = 3.5*avgVoltage*avgVoltage-35*avgVoltage+89;

        Serial.print("temperature: ");
        Serial.print(temperature,1);
        
        if(temperature < temp_min){  // Low-temperature alarm
          Serial.print("TempStatus: 0 \n");
          }
        else if((temperature > temp_min) && (temperature < temp_max)){ // Temperature o.k.
          Serial.print("TempStatus: 1 \n");
        }
        else if(temperature > temp_max){    // High-temperature alarm
          Serial.print("TempStatus: 2 \n");
        }
        
        Serial.print("  Time: ");
        Serial.println(currentMillis/1000);
        return temperature;
      }
    }
  
  
  //********** EC-Mesurement********//
  
  float getEC(float temperature){
    for(int i=0;i<5;i++){   //loop to write values to array
      digitalWrite(ECPower,HIGH); //turn Sensor ON and OFF to avoid ionisation
      delay(100);
      val[i]=analogRead(ECPin);
      digitalWrite(ECPower,LOW);
      delay(5000);
      }
  
    for(int i=0;i<4;i++){     //Bubblesort
      for(int j=i+1;j<5;j++){
        if(val[i]>val[j]){
          temp=val[i];
          val[i]=val[j];
          val[j]=temp;
          }
        }
      }
    avgVoltage=0; //reset average voltage
    for(int i=1;i<4;i++){   //cut peaks
      avgVoltage+=val[i];
      }
      
    avgVoltage /= 3;   // calculate average value
    avgVoltage = avgVoltage*(inputVoltage/1024.0);  // calculate voltage from average analogRead value

    ecResistance=(avgVoltage*R1_EC)/(inputVoltage-avgVoltage); //calculates resistance from measured voltage 
    ecResistance-=25; //taking pin resistance into account
    EC= 1000/(ecResistance*ecCellConstant); //calculate EC-value in mS/cm
    EC25= EC/(1+ temperatureCoef*(temperature-25.0)); //temperature compensation
    Serial.print("EC: ");
    Serial.print(EC25);
    Serial.print("  Time in s: ");
    Serial.println(currentMillis/1000);
    return EC25;
  }
  
            ///////////////////////////////////////
            //////////////pH control///////////////
            ///////////////////////////////////////
  
  float getPh(){
    float ph; //pH-value
    float avgValue = 0; //average from array
    float buf[200];  // buffer array for measurement
    float phVol; //measured voltage
    float temp;   //temporary for bubblesort
    
    for(int i=0;i<200;i++) { // write measured ADC-values in array
      buf[i]=analogRead(phRead);
      delay(10);
    }
    
    for(int i=0;i<200;i++){   //Bubblesort
      for(int j=i+1;j<200;j++){
        if(buf[i]>buf[j]){
          temp=buf[i];
          buf[i]=buf[j];
          buf[j]=temp;
         }
       }
     }
           
    for(int i=20;i<180;i++){   //cut peaks                                                            :::::::::::::::::::::::::::::::::________-------___________::::::::::::::::::
      avgValue+=buf[i];
    } 
   
   phVol=(avgValue*inputVoltage/1024.0)/160;   // calculate average-voltage
   ph = -6.0814*phVol+26.7; //convert into pH value
   Serial.print("ph: ");
   Serial.println(ph,2);
   
   if(ph < ph_min){  // Low-ph alarm
      Serial.print("phStatus: 0 \n");
      }
   else if((ph > ph_min) && (ph < ph_max)){ // ph o.k.
      Serial.print("phStatus: 1 \n");
      }
   else if(ph > ph_max){    // High-pH alarm
      Serial.print("phStatus: 2 \n");
      }
   return ph;
  }
  
  // +++++++++++ pH Control +++++++++++++
  
  void phControl(float currentPh){
   if((currentPh - 0.1) > setPh){    // pH hysteresis--> pH +0.1
      digitalWrite(dosPump,HIGH);
      delay(200);                   // --> 0.8 ml @ 5V
      digitalWrite(dosPump,LOW);
   }
  }
     
  void phMeasureAndControl(long interval ){   // interval in s
    interval*=1000;
    if((currentMillis - prePhMillis) > interval){
      prePhMillis = currentMillis;
      do{
        lastPosition = EEPROM.read(rotateEEPROM);
        switch(lastPosition){  // next step depends on last position of rotateStepper
          case 1:   // --> at sensorStorage
            moveToFlushSensor();
            break;
          case 2:  //  --> at flush after storage
            moveToMeasurement();
            delay(5000);
            getPh();
            phControl(getPh());
            break;
          case 3:  //  -->at measurement
            Serial.println("Measurement complete");
            moveToClean();
            break;
          case 4:  // --> at flush after measurement
            moveToSensorStorage();
            break;
          default:
            Serial.println(" Sensor Position Error");
            break;
         }
      }
      while(rotateStepper.stepN != 0);  // stops if sensor is in the storage-fluid again
    }
  }  
  
  
  /*  VALUES FOR EEPROM WRITE rotateStepper position
     *  1 = storage
     *  2 = flush before measurement
     *  3 = measurement
     *  4 = flush after measurement */
  
  void liftSensor(){
    if(liftStepper.stepN < 1024){   //avoids whole revolution
      mvCW = true;
      liftStepper.moveTo(mvCW, 1024);
      EEPROM.write(liftEEPROM, 0);   //write "0" for lifted sensor
      delay(1000);
    }
  }
    
  void sinkSensor(){
    if(liftStepper.stepN > 0){    // avoids whole revolution to EEPROM
      mvCW = false;
      liftStepper.moveTo(mvCW,0);
      EEPROM.write(liftEEPROM,1); //write "1" for sunk sensor to EEPROM
      delay(1000);
    }
  }
  
  void moveToSensorStorage(){
    liftSensor();
    mvCW = true;
    rotateStepper.moveTo(mvCW,0);
    EEPROM.write(rotateEEPROM,1); /*saves current position to EEPROM 
                                    so there are no troubles with position after restart
                                    (doesnt save step to save EEPROM memory)*/
    Serial.print("arm-position: 1 --> step: ");
    Serial.println(rotateStepper.getStep());
    delay(1000);    // wait for sensor to stop swinging
    sinkSensor();
  }
  
  void moveToFlushSensor(){ //flush electrolyte solution
    liftSensor();
    mvCW = false;
    rotateStepper.moveTo(mvCW, 3072);
    EEPROM.write(rotateEEPROM,2);
    Serial.print("arm-position: 2 --> step: ");
    Serial.println(rotateStepper.getStep());
    delay(1000);  //wait for sensor to stop swinging
    sinkSensor();
  }
  
  void moveToMeasurement(){
    liftSensor();
    mvCW = false;
    rotateStepper.moveTo(mvCW, 2048);
    EEPROM.write(rotateEEPROM,3);
    Serial.print("arm-position: 3 --> step: ");
    Serial.println(rotateStepper.getStep());
    delay(1000);  // wait for sensor to stop swinging
    sinkSensor();
  }
  
  void moveToClean(){   // cleaning after measurement
    liftSensor();
    mvCW = true;
    rotateStepper.moveTo(mvCW, 3072);
    EEPROM.write(rotateEEPROM,4);
    Serial.print("arm-position: 4 --> step: ");
    Serial.println(rotateStepper.getStep());
    delay(1000);  //wait for sensor to stop swinging
    sinkSensor();
  }
  
  /*  VALUES FOR EEPROM WRITE rotateStepper;
     *  1 = storage
     *  2 = flush before measurement
     *  3 = measurement
     *  4 = flush after measurement */
  
  int getLastPosition (int eepromAdress){  /*gets last stepper position(0-4) from EEPROM 
                                             and convert it into step-position(0-3584)*/
      
    int lastStep;
    lastPosition = EEPROM.read(eepromAdress);
       
    switch(lastPosition){
      case 0:   //only used by liftStepper if sensor is lifted
        lastStep = 1024;
        break;
      case 1:   //used by rotateStepper and by liftStepper if sensor is sunk
        lastStep = 0;
        break;
      case 2:   //only used by rotateStepper
        lastStep = 3072;
        break;
      case 3:   //only used by rotateStepper
        lastStep = 2048;
        break;
      case 4:   //only used by rotateStepper
        lastStep = 3072;
        break;
      default:
        Serial.println("invalid Position");
        break;
      }
    return lastStep;
  }
  
  void printRotatePosition(int currentStep){
    switch(currentStep){
      case 0:
        Serial.println("arm-position: Storage: Step 0");
        break;
      case 2048:
        Serial.println("arm-position: measuring: Step 2048");
        break;
      case 3072:
        Serial.println("arm-position: flush: Step 3072");
        break;
      default:
        Serial.println("arm-position: Sensor Position Error");
    }
  }
  
            ///////////////////////////////////////
            //////////////water pump///////////////
            ///////////////////////////////////////
  void waterPumpCtrl(unsigned long timePumpOn, unsigned long timePumpOff){   //times in minutes
    timePumpOn *= 60000;
    timePumpOff *= 60000;
    
    if(((currentMillis - preWaterPumpMillis) > timePumpOff)&&pumpState==false){
      preWaterPumpMillis = currentMillis;
      digitalWrite(waterPump,HIGH);
      pumpState = true; 
    }
    else if((currentMillis-preWaterPumpMillis)> timePumpOn && pumpState==true){
      preWaterPumpMillis = currentMillis;
      digitalWrite(waterPump,LOW);
      pumpState= false;
      waterPumpStopMillis=currentMillis; //set time for waterlvl-measurement
                                        //to make sure theres no water left in the patch
    }
    Serial.print("waterpumpState: ");
    Serial.println(pumpState);
  }
  
            ///////////////////////////////////////
            //////////////water level//////////////
            ///////////////////////////////////////
  
  float getWaterlvl(unsigned int interval){  //function for distance measurement - interval in whole minutes
    interval *= 60000;
    float alarmHysteresis = 2.0; // alarmHysteresis in cm
    if((currentMillis - preWaterlvlMillis) > interval){
      preWaterlvlMillis = currentMillis;
      digitalWrite(trigPin, LOW);
      delayMicroseconds(5);   //clear trigger pin
      digitalWrite(trigPin, HIGH);// send signal --> sensor needs a 10µs signal at least
      delayMicroseconds(10); 
      digitalWrite(trigPin, LOW);
      duration = pulseIn(echoPin, HIGH);  // read signal
      waterlvl = sonicsensorRange - duration*0.034/2; //distance = time * speed [cm/µs] --> divide by two because sonicwaves need 
                                                      //the double way to get back to the sensor.
      Serial.print("waterlevel: ");
      Serial.print(waterlvl);
      Serial.println("cm");
      
      if((waterlvl < (waterlvl_min - alarmHysteresis))){  // Low waterlevel alarm
          Serial.print("waterlvlStatus: 0 \n");
          }
        else if((waterlvl > (waterlvl_min)) && (waterlvl < waterlvl_max)){ // waterlevel o.k.
          Serial.print("waterlvlStatus: 1 \n");
        }
        else if(waterlvl > (waterlvl_max + alarmHysteresis)){    // High waterlevel alarm
          Serial.print("waterlvlStatus: 2 \n");
        }
      
      return(waterlvl);
    }
    
  }
  
  void waterlvlCtrl(float distance){
    if((waterlvl < waterlvl_min)&&((currentMillis-waterPumpStopMillis) > waterlvlCtrlDelay)){  // open fresh-water valve if waterlvl is below min waterlvl 
                                                                                               // and waterpump is turned of for more than 15 minutes
      do{
        Serial.println("topping up water");
        digitalWrite(valve, HIGH);
        getWaterlvl(0);   // get current waterlvl while topping up water
        delay(1000);
      }
      while(waterlvl < waterlvl_max); //stops if container is filled up to maximum
      digitalWrite(valve, LOW);
      Serial.println("finished");

    }
  }
  

