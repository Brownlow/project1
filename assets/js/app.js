$(function(){

//Initialize firebase =======================================
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
	
	var accessToken = "c6c16114ebdc4e1dac52f19365d3c296";
	var baseUrl = "https://api.dialogflow.com/v1/";
	
	var sessionID = Math.floor(Math.random() * 10000000);
	var connected = database.ref(".info/connected");

// This hides the main content dynamically adds a start button 
	$(".mainContainer").hide();

	var newBtn = $("<button>");
	newBtn.attr("id", "startBtn");
	newBtn.text("Click to Start Session");
	$("#start").append(newBtn);

// Once the start button is clicked it starts the session and greeting you with an initial response from the bot. 
	$("#startBtn").on("click", function(event) {
		event.preventDefault();

		$(".mainContainer").show();
		$("#startBtn").hide();
	});

	$("#response").append("<div class='botResponse'>Thera-Bot: Hi there! Thank for choosing me to help you get through whatever is going on emotionally. Let's get started by telling me your name.</div>"); 

// This starts the user and bot interaction. Everytime a user click the submit button we use the ajax call to retrieve data from the dialogflow api and reach our trained bot and will append its response to the page in accordance to the users input. 
	$("#submit").on("click", function(event) {
		event.preventDefault();

		var text = $("#input").val();
		$("#response").append("<div class='userResponse'>You: " 	+ text + "</div>"); 
	
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
				console.log("Bot: " + response.result.fulfillment.	speech);
				$("#response").append("<div class='botResponse'>" + 	response.result.fulfillment.speech + " <img 	class='botface' src='./assets/images/	botface.png'></div>");
				$('#input').val('');
			}
		});
	});
});

	
