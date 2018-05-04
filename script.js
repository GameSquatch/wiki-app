//Endpoint for the wiki web API

//https://en.wikipedia.org/w/api.php
//?action=query&generator=search
//&grsearch="user input text"
//&prop=info&format=json

//I think that should work

var content;
var wurl = "https://en.wikipedia.org/w/api.php?action=query&generator=search&grsearch=butterfly&prop=info&format=json";

$(document).ready(function() {

    content = $("#content");

    $.ajax({
        dataType: "json",
        url: wurl,
        success: function(json) {
            content.html(JSON.stringify(json));
        }

    });

});