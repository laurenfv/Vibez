//THIS CODE NEEDS TO BE PLACED IN HTML. WAITING UNTIL NEEDED OR ALL JS DONE
//<script src="https://www.gstatic.com/firebasejs/4.11.0/firebase.js"></script>
///////////////////////////////////////////////////////////////////////////////
// Initialize Firebase
var config = {
   apiKey: "AIzaSyCZFZD9VetVU0fqwvvXZEYFVaOW8y9XPP8",
   authDomain: "vibez-c9079.firebaseapp.com",
   databaseURL: "https://vibez-c9079.firebaseio.com",
   projectId: "vibez-c9079",
   storageBucket: "vibez-c9079.appspot.com",
   messagingSenderId: "62590792102"
};
firebase.initializeApp(config);

//variable to reference the database
var databaseRef = firebase.database();
//variable to reference Azure
var AzureRef = firebase.database().ref().child("Azure");
var SpotifyRef = firebase.database().ref().child("Spotify");
var SongsRef = firebase.database().ref().child("Songs");

var show =  document.getElementById("test");

//WRITE TO DATABASE FUNCTIONS
///////////////////////////////////////////////////////////////////////////////

//Test to see if JS is working
console.log("okay");

//API keys for Azure and Spotify are stored on the database beforehand
//Song IDs were added to Firebase via a JSON file

//Need to record user logins? At minimum, store unique ID to let people use app

//==Also record previous data entries of the user


//READ FROM DATABASE FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

//Need to read/pull array of the songs from Firebase
var songIDs = SongsRef.on('value', function(snapshot){
	console.log(Object.values(snapshot.val()));
	// console.log(snapshot.val().song01);
	// console.log(snapshot.val().song02);
	// console.log(snapshot.val().song03);
	// console.log(snapshot.val().song04);
	// //need to loop from song00 to song99, how?
	// console.log(snapshot.val().song05);
	// console.log(snapshot.val().song06);
	// console.log(snapshot.val().song07);
	// console.log(snapshot.val().song08);
	// console.log(snapshot.val().song09);
	// console.log(snapshot.val().song10);
	// console.log(snapshot.val().song11);

});
//Azure API Key
///////////////////////////////////////////////////////
//STILL NEED CLARIFICATION ON HOW TO USE THE FUNCTIONS
///////////////////////////////////////////////////////
var AzureKey1 = AzureRef.once('value', function(snapshot){
	window.azureKey1 = snapshot.val().Key1;
	console.log(window.azureKey1);
});
////IF we need it, here is the 2nd key
// var AzureKey2 = AzureRef.on('value', function(snapshot){
// 	console.log(snapshot.val().Key2);
// });
// ////////////////////////////////////////////////////////

// //Spotify - API Key not yet defined, but this calls it
// ////////////////////////////////////////////////////////
// var SpotifyKey = SpotifyRef.on('value', function(snapshot){
// 	console.log(snapshot.val().Key);
// });