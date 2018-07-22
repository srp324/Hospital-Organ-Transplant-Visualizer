function render() {
    var organChoice = $("#choice option:selected").val();
    var URL = "./getOrgan?organ=" + organChoice
    $.ajax({
        type: "GET",
        url: URL,
        dataType: "text",
        success: function (msg) { //On Success
            var json = JSON.parse(msg);

            renderGraph(json);
        
        },
        error: function (jgXHR, textStatus, errorThrown) { //On Error
            alert("Error: " + textStatus + " " + errorThrown);
        }
    });
}

function renderGraph(data) {
    var config = {
        dataSource: data,
        forceLocked: false,
        graphHeight: function () { return 600; },
        graphWidth: function () { return 800; },
        linkDistance: function () { return 40; },
        nodeTypes: {
            "type": ["organ", "pediatric", "adult"]
        },
        nodeCaption: function (node) {
            if(node.rate)
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