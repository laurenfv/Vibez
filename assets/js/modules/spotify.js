// // create function to convert score to mood
// var moodMaker = function(score){
//     if (score <= 20) {
//         return score = "mad";
//     }
//     if (score <= 40 && score > 20){
//         return score = "sad";
//     }
//     if (score <= 60 && score > 40){
//         return score = "neutral";
//     }
//     if (score <= 80 && score > 60){
//         return score = "happy";
//     }
//     if (score <= 100 && score > 80){
//         return score = "ecstatic";
//     }
// }

// azureScore = moodMaker(score);
// console.log(azureScore);

// create function to convert score to mood
var moodMaker = function(mood){
    if (mood === "mad") {
        return queryURL = "https://api.spotify.com/v1/recommendations?seed_genres=pop,hip-hop,rock,latin,indie&max_valence=0.2&max_energy=0.2&max_dancibility=0.2&limit=5&market=US";
    }
    if (mood === "sad"){
        return queryURL = "https://api.spotify.com/v1/recommendations?seed_genres=pop,hip-hop,rock,latin,indie&min_valence=0.2&max_valence=0.4&min_energy=0.2&max_energy=0.4&min_dancibility=0.2&max_dancibility=0.4&limit=5&market=US";
    }
    if (mood === "neutral"){
        return queryURL = "https://api.spotify.com/v1/recommendations?seed_genres=pop,hip-hop,rock,latin,indie&min_valence=0.4&max_valence=0.6&min_energy=0.4&max_energy=0.6&min_dancibility=0.4&max_dancibility=0.6&limit=5&market=US";
    }
    if (mood === "happy"){
        return queryURL = "https://api.spotify.com/v1/recommendations?seed_genres=pop,hip-hop,rock,latin,indie&min_valence=0.6&max_valence=0.8&min_energy=0.6&max_energy=0.8&min_dancibility=0.8&max_dancibility=0.8&limit=5&market=US";
    }
    if (mood === "ecstatic"){
        return queryURL = "https://api.spotify.com/v1/recommendations?seed_genres=pop,hip-hop,rock,latin,indie&min_valence=0.8&min_energy=0.8&min_dancibility=0.8&max_dancibility=1.0&limit=5&market=US";
    }
}

// azureScore = moodMaker(score);
// console.log(azureScore);

//get songIds from the database
    //store them into an array?

//var getSongFeatures = function () {
    //var displaySongs = [];
    //create for loop that runs for the length of the songIds in the database
        //create the ajax call that queries https://api.spotify.com/v1/tracks/{id[i]}
        //get response.energy and convert it to more usable number Math.round(response.energy * 100);
        //var energyScore = moodMaker(response.energy);
        //compare energyScore to azureScore
            // if (energyScore === azureScore){
                //push to displaySongs[];
            // }
    //return displaySongs;
//}
//var urlAudioFeatures = "https://api.spotify.com/v1/audio-features/06AKEBrKUckW0KREUWRnvT";
//// Make a call using the token
//$.ajax({
//   url: urlAudioFeatures,
//   type: "GET",
//   beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _token );},
//   success: function(data) { 
//    console.log(data);
//     // Do something with the returned data
//     // data.items.map(function(artist) {
//     //   let item = $('<li>' + artist.name + '</li>');
//     //   item.appendTo($('#top-artists'));
//     });
//   }
//});