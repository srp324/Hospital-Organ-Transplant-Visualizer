'use strict'
var request = require('request'); //the request http wrapper module

var EventEmitter = require('events').EventEmitter;

class Service extends EventEmitter {
    constructor() {
        super();
    }

    getOrgan(organ) {
        var URL = 'http://localhost:8080/graphql?query=%7B%0A%20%20getOrgan(name%3A"' + organ.toUpperCase() + '")%20%7B%0A%20%20%20%20hospital%0A%20%20%20%20name%0A%20%20%20%20type%0A%20%20%20%20rate%0A%20%20%20%20volume%0A%20%20%7D%0A%7D'
        var self = this;

        request(URL, function (error, response, body) {
            if (error) {
                console.log(error);
            }
            var json = JSON.parse(body);

            var id = 0;
            var nodes = [];
            var edges = [];

            nodes.push({
                "id": id,
                "caption": organ.toUpperCase(),
                "type": "organ",
                "root": true
            });

            for (var i = 0; i < json.data.getOrgan.length; i++) {
                var type = json.data.getOrgan[i].type;

                nodes.push({
                    "id": ++id,
                    "caption": json.data.getOrgan[i].hospital,
                    "rate": json.data.getOrgan[i].rate,
                    "type": type
                });
                edges.push({
                    "source": id,
                    "target": 0,
                    "caption": type,
                });
            };

            var resp = { "nodes": nodes, "edges": edges }

            self.emit('resp', resp);
        });
    }

    allHospitals() {
        var URL = 'http://localhost:8080/graphql?query=%7B%0A%20%20allHospitals%20%7B%0A%20%20%20%20name%0A%20%20%20%20transplants%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20rate%0A%20%20%20%20%20%20type%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D'
        var self = this;

        request(URL, function (error, response, body) {
            if (error) {
                console.log(error);
            }
            var json = JSON.parse(body);

            var id = 0;
            var nodes = [];
            var edges = [];

            for (var i = 0; i < json.data.allHospitals.length; i++) {
                var hospId = ++id;
                var hospName = json.data.allHospitals[i].name;

                nodes.push({
                    "id": hospId,
                    "caption": hospName,
                    "type": "hospital"
                });

                var organMap = new Map();
                for (var j = 0; j < json.data.allHospitals[i].transplants.length; j++) {
                    var organId = hospId + j + 1;
                    var organName = json.data.allHospitals[i].transplants[j].name;

                    if (!organMap.has(organName))
                        organMap.set(organName, [{
                            "source": hospId,
                            "target": organId,
                            "type": json.data.allHospitals[i].transplants[j].type,
                            "rate": json.data.allHospitals[i].transplants[j].rate
                        }]);
                    else
                        organMap.get(organName).push({
                            "source": hospId,
                            "target": organId,
                            "type": json.data.allHospitals[i].transplants[j].type,
                            "rate": json.data.allHospitals[i].transplants[j].rate
                        });
                }

                //Iterate through organMap
                for (var [key, value] of organMap.entries()) {
                    nodes.push({
                        "id": value[0].target,
                        "caption": key,
                        "type": "organ"
                    })

                    if (value.length > 1)
                        edges.push({
                            "source": hospId,
                            "target": value[0].target,
                            "caption": "adult,pediatric"
                        })
                    else
                        edges.push({
                            "source": hospId,
                            "target": value[0].target,
                            "caption": value[0].type
                        })
                }

                id += json.data.allHospitals[i].transplants.length;
            };

            var resp = { "nodes": nodes, "edges": edges }

            self.emit('resp', resp);
        });
    }

    getHospital(hospName) {
        var URL = 'http://localhost:8080/graphql?query=%7B%0A%20%20getHospital(name%3A%20%22' + hospName + '%22)%7B%0A%20%20%20%20name%0A%20%20%20%20transplants%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20type%0A%20%20%20%20%20%20rate%0A%20%20%20%20%20%20volume%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D'
        var self = this;

        request(URL, function (error, response, body) {
            if (error) {
                console.log(error);
            }
            var json = JSON.parse(body);
            var transplants = json.data.getHospital[0].transplants;

            var id = 0;
            var nodes = [];
            var edges = [];

            nodes.push({
                "id": id,
                "caption": json.data.getHospital[0].name,
                "type": "hospital",
                "root": true
            });

            for (var i = 0; i < transplants.length; i++) {
                nodes.push({
                    "id": ++id,
                    "caption": transplants[i].name,
                    "rate": transplants[i].rate,
                    "type": transplants[i].type
                });
                edges.push({
                    "source": id,
                    "target": 0,
                    "caption": transplants[i].type + ": " + transplants[i].rate,
                    "type": transplants[i].type
                });
            };

            var resp = { "nodes": nodes, "edges": edges }

            self.emit('resp', resp);
        });
    }

    loadSearch() {
        var URL = 'http://localhost:8080/graphql?query=%7B%0A%20%20allHospitals%20%7B%0A%20%20%20%20name%0A%20%20%7D%0A%7D'
        var self = this;

        request(URL, function (error, response, body) {
            if (error) {
                console.log(error);
            }

            var json = JSON.parse(body);

            var allHospitals = json.data.allHospitals;
            var names = [];
            allHospitals.forEach(element => {
                names[allHospitals.indexOf(element)] = element.name;
            });

            self.emit('resp', { "names": names });
        });
    }
}
exports.Service = Service;