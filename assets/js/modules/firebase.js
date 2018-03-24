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

//Sends to firebase
var sendString = function(string){
		StringsRef.push({
			search: string
    }
		);
};

//form utility
//-------------------------------------------------------------------
var resetForm = function(form){
  $("input").val("");
};
var getFieldValue = function(form){
  return $("#form").find("input").val();
};
//-------------------------------------------------------------------



//event handler
//-------------------------------------------------------------------
var handleStringSubmit = function(event){
	 event.preventDefault();
  sendString(getFieldValue(this));
  resetForm(this);
}
var handleStringPush = function(snapshot){
  updateStrings(snapshot);
}
//-------------------------------------------------------------------



//UI change
//-------------------------------------------------------------------
var updateStrings = function(snapshot){
  if (snapshot.val().search === 0){
    return;
  }
  //*READS FROM FIREBASE
  $("#stringHolder").prepend("<p class=pastSearches>" + snapshot.val().search + "</p>")
  //*READS FROM FIREBASE
}
var usePastSearch = function(){
  var buttonText = $(this).text();
  $("input[name='userString']").val(buttonText);
}
//-------------------------------------------------------------------


//Bind Event Handler
//-------------------------------------------------------------------
$("#form").submit(handleStringSubmit);

StringsRef.on("child_added", handleStringPush);

event listener for usePastSearch
$("#stringHolder").on("click", '.pastSearch', usePastSearch);
//-------------------------------------------------------------------
