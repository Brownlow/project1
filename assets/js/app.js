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
//========================================Song Generation test
	
	// Create an array of moods and their associated songs
	var songs = {
      "happy": [
        "MOWDb2TBYDg?rel=0'",
        "6bWyhj7siEY",
        "uWXUWepSak4?rel=0'",
        "QXCGnTy-v2M?rel=0'",
        "5CeRWTdYFY8?rel=0'"
      ],
      "sad": [
        "4N3N1MIvVc4?rel=0'",
        "9vjNdSOgFso?rel=0'",
        "5rOiW_xY-kc?rel=0'",
        "ZkJwpYrcAko?rel=0'",
        "6G-5quGyj1g?rel=0'"
      ],
      "mad": [
        "02D2T3wGCYg?rel=0'",
        "EfzmXOsHdPE?rel=0'",
        "H4aGp61jT_4?rel=0'",
        "3rFoGVkZ29w?rel=0'",
        "7Zb_Ma7fJNw?rel=0'"
      ], 
      "afraid": [
        "mNP3SbWI0GU?rel=0'",
        "tMqifNjO1ZA?rel=0'",
        "I2PoSIjk8cE?rel=0'",
        "C_pI576Ht3A?rel=0'"
      ],
      "hurt": [
        "5rOiW_xY-kc?rel=0'",
        "FywSzjRq0e4?rel=0'",
        "8taXDD9RCL8?rel=0'",
        "-l1Qy8FqQ2U?rel=0'",
        "-l1Qy8FqQ2U?rel=0'",
        "B3l0kpl5tA4?rel=0'"
      ],
      "indifferent": [
        "u-Y3KfJs6T0?rel=0'",
        "AMoLwrarElA?rel=0'",
        "C6PNc9KN50M?rel=0'",
        "RXGqpI2q0FI?rel=0&amp;start=28'",
        "avU2aarQUiU?rel=0'"
      ],
      "confused": [
        "ZlzGwWfibEk?rel=0'",
        "YTtGSNICXEM?rel=0'",
        "7ut52Szpd-w?rel=0'",
        "7ut52Szpd-w?rel=0'",
        "QHmH1xQ2Pf4?rel=0'"
      ],
      "helpless": [
        "J2z7LXpAX3Q?rel=0&amp;start=25'",
        "1BeyIjswOkI?rel=0'",
        "m53--yTPQNk?rel=0'",
        "NTNp1IbNLzA?rel=0'",
        "4N3N1MlvVc4?rel=0'"
      ],
      "love": [
        "otXGqU4LBEI?rel=0'",
        "KKC-6tKKfgM?rel=0'",
        "mTa8U0Wa0q8?rel=0'",
        "AFgCkwI1gTw'",
        "swSytFVMHuU?rel=0'",
        "xs9mkVMv830?rel=0'",
        "0P5jV4lHHR0?rel=0'",
      ],
      "hungry": [
        "mQLxz8Vp-YI?rel=0'",
        "ly7PONiKGUs?rel=0'",
        "mK4O8hi30UA?rel=0'",
        "oRTNtj5LU4Y?rel=0'"
      ]
      }


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
	function song(mood) {
		var chosenSong = songs[mood][Math.floor(Math.random() * songs[mood].length)]
    		console.log(chosenSong);
    		$(".video").html("<iframe width='560' height='315' src='https://youtube.com/embed/" + chosenSong + " frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>");
			console.log("<iframe width='560' height='315' src='https://youtube.com/embed/" + chosenSong + " frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>");
	}
	song("helpless");
});

