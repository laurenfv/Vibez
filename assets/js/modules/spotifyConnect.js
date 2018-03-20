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

var urlTracks = 'https://api.spotify.com/v1/tracks';
var urlAudioFeatures = 'https://api.spotify.com/v1/audio-features?ids=7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B';
var urlPlaylists = 'https://api.spotify.com/v1/browse/categories/mood/playlists?country=US&limit=50'
var urlCategories = 'https://api.spotify.com/v1/browse/categories?country=US&limit=50&offset=5'

var categoriesArray = [];

$.ajax({
   url: urlCategories,
   type: "GET",
   beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _token );},
   success: function(data) { 
     // Do something with the returned data
      console.log(data);
//       console.log(data.audio_features.energy);
//       console.log(data.items.energy);
//       console.log(data.items.audio_features.energy);
        for (i = 0; data.categories.items.length; i++){
            categoriesArray.push(data.categories.items[i].id);
        }

        console.log (categoriesArray);
     //       
   }
});