//UI change

//Change the iframes to the new generated song list

//displays mood of string on HTML
var showMood = fucntion(snapshot){
	  if (snapshot.val().search === 0){
    return;
  }
  $(@Moodreader).text(@val.givenmood)
}

//send text of a users' search button to search bar
var usePastSearch = function(){
  var buttonText = $(this).text();
  $("input[name='userString']").val(buttonText);
}
//-------------------------------------------------------------------
//PUSHES OTHER USER INPUTS TO HTML
var updateStrings = function(snapshot){
  if (snapshot.val().search === 0){
    return;
  }
  //*READS FROM FIREBASE
  	//might need to write additional code so that previous searches
  	//can be clicked and lead straight to the search.
  $(@PLACHOLDERforHTML).prepend("<p class=pastSearches>" + snapshot.val().search + "</p>")
  //*READS FROM FIREBASE
}
//-------------------------------------------------------------------
