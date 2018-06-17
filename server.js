//Import and initialization
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.use(express.static("."));

app.listen(8080, function(){
	console.log("Server started on port 8080");
});

app.get('/getData', function (req, res) {
    request({
        //TODO: Make URL Dynamic
        uri: "https://www.srtr.org/transplant-centers/?&organ=kidney&recipientType=adult&sort=rating&page=1/",
    }, function (error, response, body) {
        var $ = cheerio.load(body);

        var hospitals = [];

        $('li[class=searchResults-item]').each(function(i, elem) {
            hospitals[i] = { 
                name: $('.searchResults-name h5').eq(i).text(),
                volume: $('.searchResults-transplantVolume-hd').eq(i).text(),
                rate: $('.searchResults-transplantRate-hd').eq(i).text(),
                type: "adult"
            }
        });

        res.send(JSON.stringify(hospitals));
    });
})
