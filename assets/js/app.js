// api url = https://api.dialogflow.com/v1/query?v=20150910

// Authorization: Bearer 2d39bfb1417c41a1b31dba35018c1b74

// Developer Access Token e78f4f72045f4255a670c60fe425182c

// Ex - GET https://api.dialogflow.com/v1/query?v=20150910&contexts=shop&lang=en&query=apple&sessionId=12345&timezone=America/New_York

var queryURL = 'https://api.dialogflow.com/v1/query?v=20150910';

var authKey = "2d39bfb1417c41a1b31dba35018c1b74";
var accessToken = "e78f4f72045f4255a670c60fe425182c";

$.ajax({
    url: queryURL,
    method: "GET",
    Headers: 
	Authorization: 'e78f4f72045f4255a670c60fe425182c'
  }).done(function() {

	console.log("URL: " + queryURL);



  });