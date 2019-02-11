# Aquaponic
Aquaponic - Project Folder


What is the aim of the project: 
Our project aims to rebuild and automate a nutrient cycle between a fish tank and a vegetable patch. In the process of creating that cycle the fishes play the most significant part. The fishes enrich the water in the tank with the needed nutrients. The water will get pumped in the vegetable patch to supply the plants with the needed nutrients. The vegetables revoke the nutrients with their roots and the clean water flows back in the fish tank. 

To keep the system in balance, it is necessary to measure some important sensor values such as the water temperature, the pH value, the ambient Temperature, the ic value and so on.  
An Arduino will collect all sensor data and sends the data to a raspberry Pi via the serial interface. The Raspberry sends the Data to our Cloud Server using an http POST request. 
A NodeJS Script receives the POST Requests and creates collection entries on our Database MongoDB.  

It should be possible for the client, to get the status of the fish tank at every time possible and most important LIVE. Only if these two criterias are met, it is possible to react fast on any troubles with the fish tank. 
To accomplish this goal we created a web application that runs on our webserver using the programming language Javascript - react. The graphical user interface visualizes the data from our Database in diagrams and graphs. 

![alt text](https://github.com/UnoMeDD/Aquaponic/blob/feature/duda/Backend/FunctionDiagram.png)
