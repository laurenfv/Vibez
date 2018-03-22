var score;

$(function() {
    var userInput = "I hate peanut butter ice cream.";
    var params = {
        "documents": [
            {
                "language": "en",
                "id": "1",
                "text": userInput
            }
        ]
    }
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
    })
    .fail(function() {
        // alert("error");
        console.log("error");
    });
});

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

var azureScore;

azureScore = moodMaker(score);
console.log(azureScore);