var config = {
    //TODO: Replace getOrgan.json with API call to /getOrgan?organ=kidney
    dataSource: 'data/getOrgan.json',
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
            "width": 2
        }
    }
};

alchemy = new Alchemy(config);