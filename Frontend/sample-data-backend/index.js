const express = require("express");
const app = express();
const port = 4000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/temperature", (req, res) => {
  let timespan = req.query.timespan;

  let currentTimeStamp = Math.round(new Date().getTime() / 1000);
  var endtimeStamp = 0;

  if (timespan == "24h") {
    endtimeStamp = currentTimeStamp - 24 * 60 * 60;
  } else if (timespan == "12h") {
    endtimeStamp = currentTimeStamp - 12 * 60 * 60;
  } else if (timespan == "3d") {
    endtimeStamp = currentTimeStamp - 24 * 60 * 60 * 3;
  }

  var data = [];
  for (var i = currentTimeStamp; i >= endtimeStamp; i -= 30 * 60) {
    data.push({
      timestamp: i,
      value: randomNumber(25, 32)
    });
  }

  console.log(
    "Request: " +
      timespan +
      " Returned " +
      String(data.length) +
      " values with timestamps."
  );

  res.send(data);
});

app.get("/ph", (req, res) => {
  let timespan = req.query.timespan;

  let currentTimeStamp = Math.round(new Date().getTime() / 1000);
  var endtimeStamp = 0;

  if (timespan == "24h") {
    endtimeStamp = currentTimeStamp - 24 * 60 * 60;
  } else if (timespan == "12h") {
    endtimeStamp = currentTimeStamp - 12 * 60 * 60;
  } else if (timespan == "3d") {
    endtimeStamp = currentTimeStamp - 24 * 60 * 60 * 3;
  }

  var data = [];
  for (var i = currentTimeStamp; i >= endtimeStamp; i -= 30 * 60) {
    data.push({
      timestamp: i,
      value: randomNumber(7, 8)
    });
  }

  console.log(
    "Request: " +
      timespan +
      " Returned " +
      String(data.length) +
      " values with timestamps."
  );

  res.send(data);
});

app.get("/pump", (req, res) => {
  var randomBool = Math.random() >= 0.5;

  res.send({
    pumpRunning: randomBool
  });
});

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
