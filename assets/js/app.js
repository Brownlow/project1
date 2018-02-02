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
	headers: {
		"Authorization": "Bearer" + accessToken
	},
}).done(function(response) {

	console.log(response);
	console.log(response.result.fulfillment.speech);


}).fail(function(err) {

  throw err;
});


// Update info on page load or when new info added ============================================

database.ref().on("child_added", function(childSnapshot) {
	
	//console.log('i got info');
	//console.log(result.fulfillment.speech);
});

// On click event to get users input to the chat ========================================

$('#message-submit').on('click', function(event){

	event.preventDefault();

	var name = $('#input').val().trim();

	var chat = {
		name: name,
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

	var chat = childSnapshot.val().name;
	var sessionId = childSnapshot.val().sessionID;
	var chatlog = childSnapshot.val().chatlog;

	

});






