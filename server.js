//Import and initialization
var express = require('express');
var request = require('request');
var app = express();

app.use(express.static("."));

app.listen(8080, function(){
	console.log("Server started on port 8080");
});

app.get('/getData', function (req, res) {
    request({
        uri: "https://www.srtr.org/transplant-centers/?&organ=kidney&recipientType=adult&sort=rating&page=1/",
    }, function (error, response, body) {
        console.log(body);
        res.send(body);
    });
})
