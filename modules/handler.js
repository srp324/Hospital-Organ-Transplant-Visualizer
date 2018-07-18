'use strict'
var request = require('request'); //the request http wrapper module

var EventEmitter = require('events').EventEmitter;

class Handler extends EventEmitter {
    constructor() { 
        super(); 
    }

    getOrgan(organ) {
        var URL = 'http://localhost:8080/graphql?query=%7B%0A%20%20getOrgan(name%3A"'+ organ.toUpperCase() +'")%20%7B%0A%20%20%20%20hospital%0A%20%20%20%20name%0A%20%20%20%20type%0A%20%20%20%20rate%0A%20%20%20%20volume%0A%20%20%7D%0A%7D'
        var self = this; 

        request(URL, function (error, response, body) {
            if (error) {
                console.log(error);
            }
            var json = JSON.parse(body);

            var id = 0;
            var max_rate = 0;
            var nodes = [];
            var edges = [];

            nodes.push({
                "id": id,
                "caption": organ.toUpperCase(),
                "root": true
            });

            for (var i = 0; i < json.data.getOrgan.length; i++) {
                var type = json.data.getOrgan[i].type;
                
                if (json.data.getOrgan[i].rate >= max_rate)
                    max_rate = json.data.getOrgan[i].rate;

                nodes.push({
                    "id": ++id,
                    "caption": json.data.getOrgan[i].hospital,
                    "type": type
                });
                edges.push({
                    "source": id,
                    "target": 0,
                    "caption": type,
                    "rate": json.data.getOrgan[i].rate,
                });
            };

            var resp = {"nodes": nodes, "edges": edges, "max_rate": max_rate}

            self.emit('resp', resp); 
        });
    }
}
exports.Handler = Handler;