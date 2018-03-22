//UI change

//Change the iframes to the new generated song list

//displays mood of string on HTML
var showMood = fucntion(snapshot){
	  if (snapshot.val().search === 0){
    return;
  }
  $(@Moodreader).text(@val.givenmood)
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
