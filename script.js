//Endpoint for the wiki web API

//https://en.wikipedia.org/w/api.php
//?action=query&generator=search
//&grsearch="user input text"
//&prop=info&format=json

//I think that should work

var content;
var queryArray;
var searchWord = "butterfly";
var wurl = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=" + searchWord;

$(document).ready(function() {

    content = $("#content");

    $.ajax({
        dataType: "jsonp",
        url: wurl,
        success: function(json) {
            content.html(JSON.stringify(json));
            queryArray = json["query"]["search"];

            for (var i = 0; i < queryArray.length; ++i) {
                createArticleDiv(queryArray[i]["title"], queryArray[i]["snippet"], queryArray[i]["pageid"]);
            }
        }

    });

});

function createArticleDiv(title, snippet, pageid) {
    var div = "<div class='article'><strong>" + title + "</strong><p><a href='https://en.wikipedia.org/wiki/Translation?curid='" + pageid + " target='_blank'>" + snippet + "</a></p></div>";

    $("#content").append(div);
}