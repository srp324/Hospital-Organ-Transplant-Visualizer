'use strict'
var request = require('request'); //the request http wrapper module

var EventEmitter = require('events').EventEmitter;

class Handler extends EventEmitter {
    constructor() { 
        super(); 
    }

    getHospitalTransplants() {
        var URL = 'http://localhost:8080/graphql?query=%7B%0A%20%20allHospitals%20%7B%0A%20%20%20%20name%0A%20%20%20%20transplants%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20rate%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D'
        var self = this; 

        request(URL, function (error, response, body) {
            if (error) {
                console.log(error);
            }
            var json = JSON.parse(body);

            

            self.emit('resp', json); 
        });
    }
}
exports.Handler = Handler;