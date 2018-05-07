//Endpoint for the wiki web API

//https://en.wikipedia.org/w/api.php
//?action=query&generator=search
//&grsearch="user input text"
//&prop=info&format=json

//I think that should work

var content;
var contentContainer;
var textSearch;
var queryArray;
var searchWord = "butterfly";
var wurl = "https://en.wikipedia.org/w/api.php"
            + "?action=query&format=json&list=search&srsearch=";

$(document).ready(function() {

    content = $("#content");
    contentContainer = $("#content");
    textSearch = $("#textSearch");
    textSearch.keypress(function(event) {
        if (event.which == 13 && textSearch.is(':focus') && textSearch.val() !== '') {
            search();
            return false;
        }
    });

});

function createArticleDiv(title, snippet, pageid) {
    var div = "<a target='_blank' href='https://en.wikipedia.org/?curid="
                + pageid + "'><div class='linkBox'><strong><span class='title'>" + title
                + "</span></strong><p class='snipp'>" + snippet + "</p></div></a>";

    content.append(div);
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

            //removes previous search's content
            $('.linkBox').remove();

            //for every item in wiki query array, create a div to display on the screen
            for (var i = 0; i < queryArray.length; ++i) {
                createArticleDiv(queryArray[i]["title"]
                                , queryArray[i]["snippet"]
                                , queryArray[i]["pageid"]);
            }
        }

    });
}

