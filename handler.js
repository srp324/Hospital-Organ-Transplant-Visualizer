// function getData() {
//     $.ajax({
//         url:'https://www.srtr.org/transplant-centers/?&organ=kidney&recipientType=adult&sort=rating&page=1/',
//         type:'get',
//         headers: {
//             'Access-Control-Allow-Origin': '*' 
//         },
//         success: function(data){
//          console.log($(data)); 
//         }
//       });
// }

function getData() {
    $.ajax({
        type: "GET",
        url: "./getData",
        dataType: "text",
        success: function (msg) { //On Success
            console.log(msg)
        },
        error: function (jgXHR, textStatus, errorThrown) { //On Error
            alert("Error: " + textStatus + " " + errorThrown);
        }
    });
}