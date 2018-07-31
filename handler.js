//TODO: Reset alchemy canvas on each function call

function getOrgan() {
    var organChoice = $("#choice option:selected").val();
    var URL = "./getOrgan?organ=" + organChoice
    $.ajax({
        type: "GET",
        url: URL,
        dataType: "text",
        success: function (msg) { //On Success
            var json = JSON.parse(msg);
            createOrganGraph(json);
        },
        error: function (jgXHR, textStatus, errorThrown) { //On Error
            alert("Error: " + textStatus + " " + errorThrown);
        }
    });
}

function createOrganGraph(data) {
    var config = {
        dataSource: data,
        forceLocked: false,
        graphHeight: function () { return 600; },
        graphWidth: function () { return 800; },
        linkDistance: function () { return 40; },
        initialScale: .5,
        initialTranslate: [150, 125],
        nodeTypes: {
            "type": ["organ", "pediatric", "adult"]
        },
        nodeCaption: function (node) {
            if (node.rate)
                return node.caption + "-" + node.rate;
            else
                return node.caption;
        },
        nodeStyle: {
            "organ": {
                "radius": 25,
                "color": "#00ce06",
                "borderColor": "009e04",
                "borderWidth": 5
            },
            //TODO: Figure out accurate radius sizing based on rate
            "pediatric": {
                "radius": function (d) { return d.getProperties().rate / 8; },
                "borderWidth": function (d, radius) { return radius / 5; },
            },
            "adult": {
                "radius": function (d) { return d.getProperties().rate / 8; },
                "color": "#ff4242",
                "borderColor": "#ad2222",
                "borderWidth": function (d, radius) { return radius / 5; },
            }
        },
        edgeStyle: {
            "all": {
                "width": 2,
                "opacity": 0.1,
            }
        }
    };

    alchemy = new Alchemy(config);
}

function getAllHospitals() {
    $.ajax({
        type: "GET",
        url: "./allHospitals",
        dataType: "text",
        success: function (msg) { //On Success
            var json = JSON.parse(msg);
            createAllHospitalsGraph(json);
        },
        error: function (jgXHR, textStatus, errorThrown) { //On Error
            alert("Error: " + textStatus + " " + errorThrown);
        }
    });
}

function createAllHospitalsGraph(data) {
    var config = {
        dataSource: data,
        forceLocked: false,
        graphHeight: function () { return 600; },
        graphWidth: function () { return 800; },
        linkDistance: function () { return 60; },
        initialScale: .75,
        initialTranslate: [-5, -5],
        nodeTypes: {
            "type": ["hospital", "organ", "pediatric", "adult"]
        },
        edgeTypes: {
            "caption": ["pediatric", "adult", "adult,pediatric"]
        },
        nodeCaption: function (node) {
            return node.caption;
        },
        nodeStyle: {
            "hospital": {
                "radius": 20,
                "color": "#de28ff",
                "borderColor": "#971aad"
            }
        },
        edgeStyle: {
            "all": {
                "width": 2,
                "opacity": .3
            },
            "pediatric": {
                "color": "#4286f4"
            },
            "adult": {
                "color": "#f44141"
            },
            "adult,pediatric": {
                "color": "#9bf441"
            }
        }
    };

    alchemy = new Alchemy(config);
}

function loadSearch() {
    $.ajax({
        type: "GET",
        url: "./loadSearch",
        dataType: "text",
        success: function (msg) { //On Success
            var json = JSON.parse(msg);
            var hospitals = json.names;
            autocomplete(document.getElementById("myInput"), hospitals);
        },
        error: function (jgXHR, textStatus, errorThrown) { //On Error
            alert("Error: " + textStatus + " " + errorThrown);
        }
    });
}

function searchHospital() {
    var hospName = $("#myInput").val();
    var URL = "./getHospital?name=" + hospName
    
    $.ajax({
        type: "GET",
        url: URL,
        dataType: "text",
        success: function (msg) { //On Success
            var json = JSON.parse(msg);
            createGetHospitalGraph(json);
        },
        error: function (jgXHR, textStatus, errorThrown) { //On Error
            alert("Error: " + textStatus + " " + errorThrown);
        }
    });
}

function createGetHospitalGraph(data) {
    var config = {
        dataSource: data,
        forceLocked: false,
        graphHeight: function () { return 600; },
        graphWidth: function () { return 800; },
        linkDistance: function () { return 100; },
        nodeTypes: {
            "type": ["hospital", "pediatric", "adult"]
        },
        edgeTypes: {
            "type": ["pediatric", "adult"]
        },
        nodeCaption: function (node) {
            return node.caption;
        },
        nodeStyle: {
            "hospital": {
                "radius": 20,
                "color": "#de28ff",
                "borderColor": "#971aad"
            },
            "pediatric": {
                "color": "#4286f4"
            },
            "adult": {
                "color": "#f44141",
                "borderColor": "#ad2222"
            }
        },
        edgeStyle: {
            "all": {
                "width": 2,
                "opacity": .3
            },
            "pediatric": {
                "color": "#4286f4"
            },
            "adult": {
                "color": "#f44141"
            },
            "adult,pediatric": {
                "color": "#9bf441"
            }
        }
    };

    alchemy = new Alchemy(config);
}