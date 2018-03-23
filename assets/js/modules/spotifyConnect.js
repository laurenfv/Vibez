//SPOTIFY API - CX

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
// SAVE TOKEN
var token = _token;
//alert('User token'+token);
// END TOKEN PART
//*******************************************
// var urlTracks = 'https://api.spotify.com/v1/tracks';
// var urlAudioFeatures = 'https://api.spotify.com/v1/audio-features?ids=7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B';
// var urlPlaylists = 'https://api.spotify.com/v1/browse/categories/mood/playlists?country=US&limit=50'
// var urlCategories = 'https://api.spotify.com/v1/browse/categories?country=US&limit=50&offset=5'
//var urlRecommendations = 'https://api.spotify.com/v1/recommendations?seed_genres=pop,hip-hop,rock,latin,indie&min_valence=0.8&max_valence=1.0&min_energy=0.8&max_energy=1.0&min_dancibility=0.8&max_dancibility=1.0&limit=5&market=US'


//*******************************************
// GET USER INPUT

//ClEAR SUBMIT FORM
function clearInput(){
    var blank = '';
    $('#userInput').val(blank);
}

var userButton = $('#userButton');
var userInput = '';

function submitInput(){
//    click button
    $(userButton).on('click',function(){
        displaySongs = [];
        userInput = $('#userInput').val().trim(); 
        clearInput();
        ajaxCall();      
    });
//    when ENTER key press
    $('#userInput').keypress(function(event){
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {   
            $(userButton).click();    
        }
    })
}  

function avoidSubmit(){
    $("#form1").submit(function(e){
    return false;
});
}
// END OF "GET USER INPUT"
//*******************************************

// PUSH USER INPUT TO FIREBASE

// END OF "PUSH USER INPUT TO FIREBASE"

//*******************************************

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

var urlMaker = function(mood){
  if (mood === "mad") {
      return mood = "https://api.spotify.com/v1/recommendations?seed_genres=pop,hip-hop,rock,latin,indie&max_valence=0.2&max_energy=0.2&max_dancibility=0.2&limit=5&market=US";
  }
  if (mood === "sad"){
      return mood = "https://api.spotify.com/v1/recommendations?seed_genres=pop,hip-hop,rock,latin,indie&min_valence=0.2&max_valence=0.4&min_energy=0.2&max_energy=0.4&min_dancibility=0.2&max_dancibility=0.4&limit=5&market=US";
  }
  if (mood === "neutral"){
      return mood = "https://api.spotify.com/v1/recommendations?seed_genres=pop,hip-hop,rock,latin,indie&min_valence=0.4&max_valence=0.6&min_energy=0.4&max_energy=0.6&min_dancibility=0.4&max_dancibility=0.6&limit=5&market=US";
  }
  if (mood === "happy"){
      return mood = "https://api.spotify.com/v1/recommendations?seed_genres=pop,hip-hop,rock,latin,indie&min_valence=0.6&max_valence=0.8&min_energy=0.6&max_energy=0.8&min_dancibility=0.8&max_dancibility=0.8&limit=5&market=US";
  }
  if (mood === "ecstatic"){
      return mood = "https://api.spotify.com/v1/recommendations?seed_genres=pop,hip-hop,rock,latin,indie&min_valence=0.8&min_energy=0.8&min_dancibility=0.8&max_dancibility=1.0&limit=5&market=US";
  }
}

//********************************************
var appendIframes = function() {
  $("#spotify-widget").empty();    
  for ( var i = 0; i < displaySongs.length; i++) {
      
    $("#spotify-widget").append("<iframe src='https://open.spotify.com/embed?uri=spotify:track:" + displaySongs[i] + "' width='100%' height='75px' frameborder='0' allowtransparency='true' allow='encrypted-media'></iframe>");
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
        
      $.ajax({
        url: queryURL,
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _token );},
        success: function(data) { 
          // Do something with the returned data
           console.log(data);
     //       console.log(data.audio_features.energy);
     //       console.log(data.items.energy);
     //       console.log(data.items.audio_features.energy);
             for (var i = 0; i < data.tracks.length; i++){
                 displaySongs.push(data.tracks[i].id);
             }
             console.log(displaySongs);
             appendIframes();
             
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
