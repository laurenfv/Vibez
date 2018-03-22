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

//WRITE TO DATABASE FUNCTIONS
///////////////////////////////////////////////////////////////////////////////
//API keys for Azure are stored on the database beforehand
//Song IDs were added to Firebase via a JSON file
//Test to see if JS is working
console.log("okay");

//firebase setter
var sendString = function(string){
		StringsRef.push({
			search: string
    }
		);
};

//form utility
var resetForm = function(form){
  $("input").val("");
};
var getFieldValue = function(form){
  return $("#form").find("input").val();
};

//event handler
var handleStringSubmit = function(event){
  sendString(getFieldValue(this));
  resetForm(this);
};

var handleStringPush = function(snapshot){
  updateStrings(snapshot);
}

//UI change
var updateStrings = function(snapshot){
  if (snapshot.val().search === 0){
    return;
  }
  //*READS FROM FIREBASE
  $("#stringHolder").prepend("<p>" + snapshot.val().search + "</p>")
  //*READS FROM FIREBASE
}

//Bind Event Handler
$("#form").submit(handleStringSubmit);


StringsRef.on("child_added", handleStringPush);
  //Whenever a child is added to StringsRef, the function handleStringPush is activated
    //handleStringPush is the event handler, "getFieldValue" will capture the user's
    //input upon clicking submit, and "sendString" will send it to Firebase


//firebase getter
