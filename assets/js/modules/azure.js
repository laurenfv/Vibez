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
var moodMaker = function(score){
    if (score <= 20) {
        return score = "mad";
    }
    if (score <= 40 && score > 20){
        return score = "sad";
    }
    if (score <= 60 && score > 40){
        return score = "neutral";
    }
    if (score <= 80 && score > 60){
        return score = "happy";
    }
    if (score <= 100 && score > 80){
        return score = "ecstatic";
    }
}

azureScore = moodMaker(score);
console.log(azureScore);