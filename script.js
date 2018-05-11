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

//the url used for the API call without the search text which is added by the user's search
var wurl = "https://en.wikipedia.org/w/api.php"
            + "?action=query&format=json&list=search&srsearch=";

$(document).ready(function() {

    content = $("#content");
    contentContainer = $("#content");
    textSearch = $("#textSearch");
    textSearch.keypress(function(event) {
        if (event.which == 13 && textSearch.val() !== '') {
            search();
            //return false;
        }
    });

});

function createArticleDiv(searchText, title, snippet, pageid) {
    var re = new RegExp(searchText, "gi");
    snippet = snippet.replace(re, "<span class='found'>" + searchText + "</span>");

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

            //grabbing the piece of the json obj that has search content in it
            queryArray = json["query"]["search"];


            //removes previous search's content
            $('.linkBox').remove();

            //for every item in wiki query array, create a div to display on the screen
            for (var i = 0; i < queryArray.length; ++i) {
                createArticleDiv(textField, queryArray[i]["title"]
                                , queryArray[i]["snippet"]
                                , queryArray[i]["pageid"]);
            }
        }

    });
}

function getRand() {
    var queryObj;

    $.ajax({
        dataType: "jsonp",
        url: "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info%7Cdescription&indexpageids=1&generator=random&grnnamespace=0",
        success: function(json) {

            //grabbing the piece of the json obj that has search content in it
            queryObj = json.query.pages[json.query.pageids[0]];
            //console.log(json);

            //removes previous search's content
            $('.linkBox').remove();

            //for every item in wiki query array, create a div to display on the screen
            // for (var i = 0; i < queryArray.length; ++i) {
            //     createArticleDiv(textField, queryArray[i]["title"]
            //                     , queryArray[i]["snippet"]
            //                     , queryArray[i]["pageid"]);
            // }
            var div = "<a target='_blank' href='https://en.wikipedia.org/?curid="
                + queryObj.pageid + "'><div class='linkBox'><strong><span class='title'>" + queryObj.title
                + "</span></strong><p class='snipp'>" + queryObj.description + "</p></div></a>";

            content.append(div);
        }

    });

}

