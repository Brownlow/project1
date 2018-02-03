// Authorization: Bearer 2d39bfb1417c41a1b31dba35018c1b74
// Developer Access Token e78f4f72045f4255a670c60fe425182c


// Initialize Firebase =========================================

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyChQLuBa0Owj-Zbnpk8_uMcIYAmFz4dFj8",
    authDomain: "chatbot-53c37.firebaseapp.com",
    databaseURL: "https://chatbot-53c37.firebaseio.com",
    projectId: "chatbot-53c37",
    storageBucket: "chatbot-53c37.appspot.com",
    messagingSenderId: "434930699010"
  };
  firebase.initializeApp(config);

var database = firebase.database();


// End Firebase Initialize ===================================================

// Add data to Firebase


var keyWord = "none";

var accessToken = "2d39bfb1417c41a1b31dba35018c1b74"; // Done
var baseUrl = "https://api.dialogflow.com/v1/";

// Stuff we get from the user responding to the chatbot =========================
var text; // user's input
var name; // user's name

var lang = '&lang=en';
var query = "What time is it?";

var sessionID = Math.floor(Math.random() * 10000000);

var connected = database.ref(".info/connected");


// Get initial message from bot "Hi Whats your name" ============================================================


$.ajax({
	type: "GET",
	url: baseUrl + "query?v=20150910&e=event_name" + lang + '&query=' + query + '&sessionId=' + sessionID,
	contentType: "application/json; charset=utf-8",
	dataType: "json",
}).done(function(response) {

	// console.log(response);
	// console.log(response.result.fulfillment.speech);


}).fail(function(err) {

  throw err;
});



// Connect to Dialog Flow API ============================================================
$.ajax({
  	type: "POST",
	url: baseUrl + "query?v=20150910" + lang + '&query=' + query + '&sessionId=' + sessionID,
	contentType: "application/json; charset=utf-8",
	dataType: "json",
	data: JSON.stringify({
		query: "What is your name?",
		lang: "en",
		sessionId: sessionID
	}),
	success: function(data) {

		var dataResult = data.result.resolvedQuery;

		if (dataResult === "") {
			console.log(data.result)
			if (data.result.action === "weather") {
  			keyWord = data.result.parameters.address.city;
  			getWeather();
			}
			else if (data.result.action === "web.search") {
  			keyWord = data.result.resolvedQuery;
  			getAnswers();
			}
        else if (data.result.action === "delivery.search") {
          keyWord = data.result.parameters.product.toString();
          getCooking();
        }
			}
			else {
				botResponse(dataResult);
				console.log(data);
			}
		},

	headers: {
		"Authorization": "Bearer" + accessToken
	},
}).done(function(response) {

	// console.log(response);
	// console.log(response.result.fulfillment.speech);


}).fail(function(err) {

  throw err;
});



function botResponse(val, name) {
	if (!name) {
		name = "Botty Mc BotFace";
	}
	$("#response").append("<strong>" + name + ":</strong> " + val + "<br>");

} 

function userResponse(val, name) {
	if (!name) {
		name = "Stacy";
	}
	$("#response").append("<strong>" + name + ":</strong> " + val + "<br>");

} 


 // On click event to get users input to the chat ========================================

 $('#message-submit').on('click', function(event){

 	event.preventDefault();

 	var text = $('#input').val().trim();

 	var chat = {
 		text: text,
 		response: response
     	//sessionId: sessionId,
     	//chatlog: chatlog
 	}

 	// Change what is saved in firebase
     database.ref().push(chat);

     // empty form fields
     $('#input').val('');

    

 });


// Retreive the Data from Firebase ==========================================================

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	var chat = childSnapshot.val().text;
	// var sessionId = childSnapshot.val().sessionID;
	// var chatlog = childSnapshot.val().chatlog;

	console.log(chat);
	$("#response").append("<strong>" + name + ":</strong> " + chat + "<br>");



});






