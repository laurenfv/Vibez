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
var database = firebase.database();
//variable to reference Azure
var AzureRef = database.ref().child("Azure");
//variable to reference Spotify Song IDs
var SongsRef = database.ref().child("Songs");
//Variable to reference User String Inputs
var StringsRef = database.ref("Strings");
//used to reference testing HTML
var show =  document.getElementById("test");

console.log(AzureRef);

//WRITE TO DATABASE FUNCTIONS
///////////////////////////////////////////////////////////////////////////////

//API keys for Azure are stored on the database beforehand
//Song IDs were added to Firebase via a JSON file
//Test to see if JS is working
console.log("okay");
//Capture User String
var storeStrings = function(){
	StringsRef.ref().on("value", function(snapshot){
		StringsRef.push({
			Text: //"VAR = VALUE OF USER INPUT HERE!"//
		})
	});
};
//READ FROM DATABASE FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
//Need to pull array of the song IDs from Firebase
var getSongIDs = function(){
	SongsRef.on('value', function(snapshot){
	window.songsArray = Object.values(snapshot.val());
	});
};
//Retrieve User Strings as an array
 var getStrings = function(){
 	StringsRef.on('value', function(snapshot){
	window.stringsArray = Object.values(snapshot.val());
 	};
};
//Azure API Key
///////////////////////////////////////////////////////
// var AzureKey1 = AzureRef.once('value', function(snapshot){
// 	window.azureKey1 = snapshot.val().Key1;
// 	console.log(window.azureKey1);
// });
// var getStuffFromAzure = function(apiKey){
// 	   $.ajax({
//         url: "https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment?" + userInput,
//         beforeSend: function(xhrObj){
//             // Request headers
//             xhrObj.setRequestHeader("Content-Type","application/json");
//             xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", apiKey);
//         },
//         type: "POST",
//         // Request body
//         data: JSON.stringify(params),
//     }).then(function(data){console.log(database)})
// // }

var getDBValByPath = function(path, callback){
	database.ref(path).once("value").then( function(snap){callback(snap.val())});
};

// console.log(getDBValByPath);

// getDBValByPath("Azure/Key1", getStuffFromAzure);

///////////////////////////////////////////////////////////

//AzureKey1