// api url = https://api.dialogflow.com/v1/query?v=20150910

// Authorization: Bearer 2d39bfb1417c41a1b31dba35018c1b74

// Developer Access Token e78f4f72045f4255a670c60fe425182c

// Ex - GET https://api.dialogflow.com/v1/query?v=20150910&contexts=shop&lang=en&query=apple&sessionId=12345&timezone=America/New_York

// var queryURL = 'https://api.dialogflow.com/v1/query?v=20150910';



// Initialize Firebase
// var config = {
//   apiKey: "AIzaSyChQLuBa0Owj-Zbnpk8_uMcIYAmFz4dFj8",
//   authDomain: "chatbot-53c37.firebaseapp.com",
//   databaseURL: "https://chatbot-53c37.firebaseio.com",
//   projectId: "chatbot-53c37",
//   storageBucket: "",
//   messagingSenderId: "434930699010"
// };

// firebase.initializeApp(config);

// var database = firebase.database();


var keyWord = "none";

var accessToken = "2d39bfb1417c41a1b31dba35018c1b74"; // Done
var baseUrl = "https://api.dialogflow.com/v1/";

var text; // user's input
var name; // user's name

//var connected = database.ref(".info/connected");



$.ajax({
  type: "GET",
	url: 'https://api.dialogflow.com/v1/query?v=20150910&contexts=shop&lang=en&query=apple&sessionId=12345&timezone=America/New_York', //baseUrl + "query?v=20150910",
	contentType: "application/json; charset=utf-8",
	dataType: "json",
	headers: {
		"Authorization": "Bearer" + accessToken
	},
}).done(function(response) {
console.log('success');




}).fail(function(err) {

  throw err;
});





