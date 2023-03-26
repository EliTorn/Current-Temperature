const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");



});

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "a90809fbc1bb2e4e0d0a5e8c1c992f8c&units";
    const unit = "metric";
    const rul = "http://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "="+unit;
    http.get(rul, function (responds) {
        responds.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const urlImage = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The Weather current in "+ query +" is " + weatherDescription + "</p>")
            res.write("<h1>The temperature in "+query+" is " + temp + "<h1/>");
            res.write("<img src=" + urlImage + ">");
            res.send();
        })
    });
})


app.listen(3000, function () {
    console.log("Server running");
});