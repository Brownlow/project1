# Thera-bot

Deployed to GitHub Pages:
https://brownlow.github.io/project1/

This bot was built to help those dealing with any kind of emotion. You can have a semi-intelligent conversation and depending on how you feel the bot will play you a song from youtube as well as show you the video. When a user visits the site they can click the start session button and the bot greets them and the conversation can start. You can leave the session at anytime by saying "I don't want to talk" and the session will end.

## Authors:

* Ryan Brownlow
* Kimarie Haverty-Bozman
* Daniel Murray
* Stacy Areas

## Motivation:

When our group came together we were immediately interested in the idea of using a chatbot to do something interesting and beneficial for people. Initially, we were attracted to the ideas of humor and music as a way to entertain our users and positively impact their moods. We quickly found ourselves discussing the idea of building a therapist, and were trying to incorporate these original notions. We toyed with the idea of a sarcastic humorous therapist, but as we did more research into available APIs we began to lean further towards music. Though it doesn't take a psychologist to know that music can have a great impact on the emotional wellbeing of the listener, research would agree. “Music therapy significantly diminished patients’ negative symptoms, increased their ability to converse with others, reduced their social isolation, and increased their level of interest in external events. As music therapy has no side-effects and is relatively inexpensive, it merits further evaluation and wider application.” (Tang, 1994) Given these ideas we decided to create an application that would help people find the kind of music that may be most therapeutic to them and their specific mood.

## Live Site:

To begin the session click the start button:

![demo](https://user-images.githubusercontent.com/33561555/35954989-9b126240-0c41-11e8-9c03-346313935a14.gif) 

Converse with the chatbot:

![demo](https://user-images.githubusercontent.com/33561555/35954662-c99df216-0c3f-11e8-9247-56054edfe494.gif)

To end the session click the end session button:

![demo](https://user-images.githubusercontent.com/33561555/35954855-e51c19cc-0c40-11e8-8229-19e122eecf9c.gif)

## How it works:

Thera-Bot uses CSS, Bootstrap, and JavaScript on the front end. Information is stored in the Firebase Database. The chatbot is built using the Dialogflow API. Thera-bot accesses a variety of libraries such as Google Fonts, Animate.css, and lettering.js.

Libraries:
jQuery, Bootstrap, Google Fonts, Animate.css, and lettering.js


Code to initialize firebase:

![initializefirebase](https://user-images.githubusercontent.com/33561555/35956086-5f571eb0-0c48-11e8-9b99-ccf51ac30f83.jpeg)

Gets users input and info from firebase:

![getuserinputandinfofromfirebase](https://user-images.githubusercontent.com/33561555/35956074-451c1582-0c48-11e8-81f1-da689819f2e7.jpg)

Hitting the Firebase API:

![hittingthefirebaseapi](https://user-images.githubusercontent.com/33561555/35955831-c7ef55a2-0c46-11e8-9c0e-fc28fd4d37ec.jpg)

Get info from firebase:

![getinfofromfirebase](https://user-images.githubusercontent.com/33561555/35955895-2862d274-0c47-11e8-9c4c-0a283fb08268.jpg)

Displaying Content and calling Dialogflow:

![contentdisplaysanddialogflowcall](https://user-images.githubusercontent.com/33561555/35955868-013e060a-0c47-11e8-8ba0-9740681f460d.jpg)





