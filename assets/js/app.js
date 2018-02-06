$(function(){

//Initialize firebase ================================================
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

// Variables =========================================================
	
	var accessToken = "c6c16114ebdc4e1dac52f19365d3c296";
	var baseUrl = "https://api.dialogflow.com/v1/";
	
	var sessionID = Math.floor(Math.random() * 10000000);
	var connected = database.ref(".info/connected");


// This hides the main content dynamically adds a start button  ============
	$(".mainContainer").hide();

	var newBtn = $("<button>");
	newBtn.attr("id", "startBtn");
	newBtn.addClass('btn btn-lg');
	newBtn.text("Click to Start Session");
	$("#start").append(newBtn);

// Once the start button is clicked it starts the session and greeting you with an initial response from the bot. 
	$("#startBtn").on("click", function(event) {
		event.preventDefault();

		$(".mainContainer").show();
		$("#startBtn").hide();
		$("#botface-lg").hide();
	});

	$("#response").append("<div class='botResponse'><img class='botface' src='./assets/images/botface.png'>" + "Hi there! Thank for choosing me to help you get through whatever is going on emotionally. Let's get started by telling me your name." + "</div>"); 

// Gets scroll location to update appended content and make it always visible on screen.
	function updateScroll(){
 	  	var element = document.getElementById("response");
 	  	element.scrollTop = element.scrollHeight;
 	}

// Submits user input and makes a call to DialogGlow bot to respond
	$("#submit").on("click", function(event) {
		event.preventDefault();
	
		var text = $("#input").val();
		$("#response").append("<div class='userResponse'><img class='userface' src='./assets/images/userface.png'>" + text + "</div>"); 

		updateScroll();
		

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
				//console.log("Bot: " + response.result.fulfillment.speech);
				$("#response").append("<div class='botResponse'><img class='botface' src='./assets/images/botface.png'>" + response.result.fulfillment.speech + "</div>");
				
				updateScroll();
				console.log(response);
				console.log(userInput);
				console.log(response.result.contexts[0].parameters.feelings);

				
				// Store info in Firebase =================================================
	
				// Unique session ID
				var chatID = sessionID;
	
				// User Input
				var userInput = $('#input').val().trim();
	
				var chat = {
					id: sessionID,
					userInput: userInput,
					response: response.result.contexts[0].parameters.feelings
				}

				if(response.result.contexts[0].parameters.feelings){

					database.ref().push(chat);
				}

				// Change what is saved in firebase
    			

				$('#input').val('');
			}
		});
	});
});

