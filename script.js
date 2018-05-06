//Endpoint for the wiki web API

//https://en.wikipedia.org/w/api.php
//?action=query&generator=search
//&grsearch="user input text"
//&prop=info&format=json

//I think that should work

var content;
var textSearch;
var queryArray;
var searchWord = "butterfly";
var wurl = "https://en.wikipedia.org/w/api.php"
            + "?action=query&format=json&list=search&srsearch=";

$(document).ready(function() {

    content = $("#content");
    textSearch = $("#textSearch");
    textSearch.keypress(function(event) {
        if (event.which == 13 && textSearch.is(':focus') && textSearch.val() !== '') {
            search();
            return false;
        }
    });

});

function createArticleDiv(title, snippet, pageid) {
    var div = "<div class='row'>"
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
            //content.html(JSON.stringify(json));
            queryArray = json["query"]["search"];

            for (var i = 0; i < queryArray.length; ++i) {
                createArticleDiv(queryArray[i]["title"]
                                , queryArray[i]["snippet"]
                                , queryArray[i]["pageid"]);
            }
        }

    });
}

