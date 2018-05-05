//Endpoint for the wiki web API

//https://en.wikipedia.org/w/api.php
//?action=query&generator=search
//&grsearch="user input text"
//&prop=info&format=json

//I think that should work

var content;
var textSearch;
var queryArray;

//the url used for the API call without the search text which is added by the user's search
var wurl = "https://en.wikipedia.org/w/api.php"
            + "?action=query&format=json&list=search&srsearch=";

$(document).ready(function() {

    content = $("#content");
    textSearch = $("#textSearch");

});

function createArticleDiv(title, snippet, pageid) {
    var div = "<div class='row article'>"
                + "<div class='col-3'></div>"
                + "<div class='col-6 linkBox'><strong>" + title
                + "</strong><p><a href='https://en.wikipedia.org/?curid="
                + pageid + "' target='_blank'>" + snippet + "</a></p></div>"
                + "<div class='col-3'></div>";

    $("#content").append(div);
}

function search() {
    var textField = textSearch.val();
    //wurl += textField;
    console.log(wurl + textField);

    $.ajax({
        dataType: "jsonp",
        url: wurl + textField,
        success: function(json) {

            //grabbing the piece of the json obj that has search content in it
            queryArray = json["query"]["search"];

            //this checks if the dom is already populated by a search and removes them
            //like a refresh of the page when you search again
            if ($(".article").length) {
                $(".article").remove();
            }

            //create dom elements for the search results and append them
            for (var i = 0; i < queryArray.length; ++i) {
                createArticleDiv(queryArray[i]["title"]
                                , queryArray[i]["snippet"]
                                , queryArray[i]["pageid"]);
            }
        }

    });
}