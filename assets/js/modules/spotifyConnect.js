// GLOBAL VARS

var userButton = $('#userButton');
var userInput = '';

// SPOTIFY API - CX
// Get the hash of the url
const hash = window.location.hash
.substring(1)
.split('&')
.reduce(function (initial, item) {
  if (item) {
    var parts = item.split('=');
    initial[parts[0]] = decodeURIComponent(parts[1]);
  }
  return initial;
}, {});

window.location.hash = '';

// Set token
let _token = hash.access_token;

// This URL won't change
const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = '5fd3769487c3456e87e6a482a031d9cd';
const redirectUri = 'https://grety22.github.io/Vibez-group3/';
const scopes = [
    //playlists
  'playlist-read-private',
  'playlist-modify-private',
  'playlist-modify-public',
  'playlist-read-collaborative',
    //users
  'user-read-private',
  'user-read-email',
  'user-read-birthdate', 
   //listeningHistory
  'user-top-read',
  'user-read-recently-played',
   //library 
  'user-library-read',
  'user-library-modify', 
   //spotify Connect 
  'user-read-currently-playing',
  'user-modify-playback-state',
  'user-read-playback-state', 
   //follow
  'user-follow-modify',
  'user-follow-read', 
   //playback 
  'streaming',  
];

// If there is no token, redirect to Spotify authorization
if (!_token) {
  window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
}

// ***************************************************************************************

// GETTING SPOTIFY USER PROFILE INFO 
    $.ajax({
        url: "https://api.spotify.com/v1/me",
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _token );},
        success: function(data) { 
          // Do something with the returned data
           var emptyArray = [];
           var userName = data.display_name;    
           var userImagesArray = data.images;    
           console.log(data.display_name);
           // Show user name
           $('<span>Welcome, </span><span id="userNameSpan">'+userName+'</span>').insertAfter( "#insertAfterHere" );
           // Show user Avatar img
           $('#userAvatar').attr('src',userImagesArray[0].url);
           }   
    })
              
    .fail(function() {
        console.log("error");
    });

// ***************************************************************************************T

// ClEAR INPUT
function clearInput(){
    var blank = '';
    $('#userInput').val(blank);
}

function submitInput(){
//    click button
    $(userButton).on('click',function(){
        $('#userInput').attr('placeholder',' ');
        displaySongs = [];
        userInput = $('#userInput').val().trim().toLowerCase();
        handleStringSubmit();
        clearInput();
        ajaxCall();   
        displayInput();   
    });
//    when ENTER key press
    $('#userInput').keypress(function(event){
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {  
            avoidSubmit();
            $(userButton).click();    
        }
    })
}  

function displayInput() {
    $('#center-vibez').text(userInput);
}

function avoidSubmit(){
    $("#form1").submit(function(e){
    return false;
});

}

//*******************************************

// PUSH USER INPUT TO FIREBASE
// firebase connection
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

//Sends to firebase
var sendString = function(string){
    StringsRef.push({
      search: string
    }
    );
};

var getFieldValue = function(form){
  return $("#userInput").val().trim().toLowerCase();
};
//-------------------------------------------------------------------
//event handler
//-------------------------------------------------------------------
var handleStringSubmit = function(event){
  //event.preventDefault();
  sendString(userInput);
  // resetForm(this);
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
  $("#stringHolder").append(
    "<li class=pastSearch><a href='#'><span>" + snapshot.val().search + "</span></a></li>"
   //"<button class=pastSearch>" + snapshot.val().search + "</button>"
   )
  //*READS FROM FIREBASE
}
var usePastSearch = function(){
  clearInput();
  var buttonText = $(this).text();
  $("input[name='userString']").val(buttonText);
}
//-------------------------------------------------------------------

//Bind Event Handler
//-------------------------------------------------------------------
//$("#form1").submit(handleStringSubmit);

StringsRef.on("child_added", handleStringPush);

//event listener for usePastSearch
$("#appendHere").on("click", '.pastSearch', usePastSearch);
//-------------------------------------------------------------------

// END OF "PUSH USER INPUT TO FIREBASE"
//********************************************

//CONVERT USER INPUT

var displaySongs = [];
var queryURL = "";
var score;
var azureScore;

// create function to convert score to mood
var moodMaker = function(number){
  if (number <= 20) {
      return number = "mad";
  }
  if (number <= 40 && number > 20){
      return number = "sad";
  }
  if (number <= 60 && number > 40){
      return number = "neutral";
  }
  if (number <= 80 && number > 60){
      return number = "happy";
  }
  if (number <= 100 && number > 80){
      return number = "ecstatic";
  }
}

// var changeColor = function() {
//     if (mood === "mad") {
//         $("section #content").css("-webkit-animation", " bg-color1 10s infinite");
//         $("section #content").css("animation", " bg-color1 10s infinite");
//     }
//     if (mood === "sad"){
//         $("section #content").css("-webkit-animation", " bg-color2 10s infinite");
//         $("section #content").css("animation", " bg-color2 10s infinite");
//     }
//     if (mood === "neutral"){
//         $("section #content").css("-webkit-animation", " bg-color3 10s infinite");
//         $("section #content").css("animation", " bg-color3 10s infinite");
//     }
//     if (mood === "happy"){
//         $("section #content").css("-webkit-animation", " bg-color4 10s infinite");
//         $("section #content").css("animation", " bg-color4 10s infinite");
//     }
//     if (mood === "ecstatic"){
//         $("section #content").css("-webkit-animation", " bg-color5 10s infinite");
//         $("section #content").css("animation", " bg-color5 10s infinite");
//     }
// }

var urlMaker = function(mood){
  if (mood === "mad") {
      return mood = "https://api.spotify.com/v1/recommendations?seed_genres=pop,hip-hop,rock,latin,indie&max_valence=0.2&max_dancibility=0.2&limit=5&market=US";
  }
  if (mood === "sad"){
      return mood = "https://api.spotify.com/v1/recommendations?seed_genres=pop,hip-hop,rock,latin,indie&min_valence=0.2&max_valence=0.4&min_dancibility=0.2&max_dancibility=0.4&limit=5&market=US";
  }
  if (mood === "neutral"){
      return mood = "https://api.spotify.com/v1/recommendations?seed_genres=pop,hip-hop,rock,latin,indie&min_valence=0.4&max_valence=0.6&min_dancibility=0.4&max_dancibility=0.6&limit=5&market=US";
  }
  if (mood === "happy"){
      return mood = "https://api.spotify.com/v1/recommendations?seed_genres=pop,hip-hop,rock,latin,indie&min_valence=0.6&max_valence=0.8&min_dancibility=0.6&max_dancibility=0.8&limit=5&market=US";
  }
  if (mood === "ecstatic"){
      return mood = "https://api.spotify.com/v1/recommendations?seed_genres=pop,hip-hop,rock,latin,indie&min_valence=0.8&min_dancibility=0.8&limit=5&market=US";
  }
}

//********************************************
var appendIframes = function() {
  $("#spotify-widget").empty();    
  for ( var i = 0; i < displaySongs.length; i++) {
    $("#spotify-widget").append("<iframe src='https://open.spotify.com/embed?uri=spotify:track:" + displaySongs[i] + "' width='100%' height='75px' frameborder='0' allowtransparency='false' allow='encrypted-media'></iframe>");
  }
}
//********************************************
function ajaxCall() {
//    var userInput = "I hate peanut butter ice cream.";
    var params = {
        "documents": [
            {
                "language": "en",
                "id": "1",
                "text": userInput
            }
        ]
    }
    // Azure API key
    var string1 = "932ad411f62c4486a61b8b2a57382644";
    var string2 = JSON.stringify(params);
    // AZURE AJAX CALL
    $.ajax({
        url: "https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment?" + userInput,
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", string1);
        },
        type: "POST",
        // Request body
        data: JSON.stringify(params),
    })
    .done(function(data) {
        // alert("success");
        score = Math.round(data.documents[0].score * 100);
        console.log(score);
        azureScore = moodMaker(score);
        console.log(azureScore);
        queryURL = urlMaker(azureScore);
    })
    .then(function(){
    // SPOTIFY AJAX TO GET TRACKS  
      $.ajax({
        url: queryURL,
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _token );},
        success: function(data) { 
          // Do something with the returned data
           console.log(data);
            
             for (var i = 0; i < data.tracks.length; i++){
                 displaySongs.push(data.tracks[i].id);
             }
             console.log(displaySongs);
             appendIframes();
            //  changeColor();
             
          //       
        }
     })
    })
    .fail(function() {
        // alert("error");
        console.log("error");
    });
    
};

// ALL CALLBACKS
submitInput();

$('#logout').click(function() {
    location.reload(true);
});

