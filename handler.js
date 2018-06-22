//Data is populated during runtime and can be JSON.stringified once the pages have been scraped by the asynchronous AJAX calls
var data = [];

//The pages to be scraped
var pages = [ 
    {name: "kidney", pages: 27, type:"adult"},
    {name: "kidney-pancreas", pages: 15, type:"adult"},
    {name: "liver", pages: 15, type:"adult"},
    {name: "pancreas", pages: 15, type:"adult"},
    {name: "heart", pages: 15, type:"adult"},
    {name: "lung", pages: 8, type:"adult"},
    {name: "heart-lung", pages: 4, type:"adult"},
    {name: "intestine", pages: 3, type:"adult"},
    {name: "kidney", pages: 27, type:"pediatric"},
    {name: "kidney-pancreas", pages: 15, type:"pediatric"},
    {name: "liver", pages: 15, type:"pediatric"},
    {name: "pancreas", pages: 15, type:"pediatric"},
    {name: "heart", pages: 15, type:"pediatric"},
    {name: "lung", pages: 8, type:"pediatric"},
    {name: "heart-lung", pages: 4, type:"pediatric"},
    {name: "intestine", pages: 3, type:"pediatric"}
];

function scrapeData() {
    for (var i = 0; i < pages.length; i++) {
        for (var j = 1; j <= pages[i].pages; j++) {
            //URL to local NodeJS endpoint
            var URL = "./scrapeData?organ=" + pages[i].name + "&type=" + pages[i].type + "&page=" + j;

            $.ajax({
                type: "GET",
                url: URL,
                dataType: "text",
                success: function (msg) { //On Success
                    var json = JSON.parse(msg);

                    //Parse json to data array
                    for (var i = 0; i < json.length; i++) {

                        //Remove cases for 0 rate
                        if (json[i].rate !== "0.0" && json[i].rate !== "0")
                            data[data.length] = json[i];
                    }
                },
                error: function (jgXHR, textStatus, errorThrown) { //On Error
                    console.log("Error: " + textStatus + " " + errorThrown);
                }
            });
        }
    }
}