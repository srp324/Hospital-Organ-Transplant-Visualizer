function getData() {
    $.ajax({
        type: "GET",
        url: "./getData",
        dataType: "text",
        success: function (msg) { //On Success
            var json = JSON.parse(msg)
            console.log(json);
        },
        error: function (jgXHR, textStatus, errorThrown) { //On Error
            alert("Error: " + textStatus + " " + errorThrown);
        }
    });
}