// Authorization: Bearer 2d39bfb1417c41a1b31dba35018c1b74
// Developer Access Token e78f4f72045f4255a670c60fe425182c
$(function(){

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
	
	var accessToken = "e78f4f72045f4255a670c60fe425182c"; // Done
	var baseUrl = "https://api.dialogflow.com/v1/";
	
	var sessionID = Math.floor(Math.random() * 10000000);
	var connected = database.ref(".info/connected");
	
	
	$("#submit").on("click", function(event) {
		event.preventDefault();
	
		var text = $("#input").val();
		$("#input").val("");
		$("#response").prepend("You: " + text); 
	
		$.ajax({
		  type: "POST",
			url: baseUrl + "query?v=20150910",
			contentType: "application/json; charset=utf-8",
			async: true,
			dataType: "json",
			headers: {
				Authorization: "Bearer" + accessToken
			},
			data: JSON.stringify({
				query: text, 
				lang: "en", 
				sessionId: sessionID
			}),
			success: function(response) {
				$("#response").prepend("Bot: " + response.result.fulfillment.speech)
			}
		});
	});
});
