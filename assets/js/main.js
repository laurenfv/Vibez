//form utility
var resetForm = function(form){
  $("@input").val("");
};
var getFieldValue = function(form){
  return $("@form").find("input").val();
};
//-------------------------------------------------------------------


//Event Handlers
//Piece that pushes to Firebase
var handleStringSubmit = function(event){
  sendString(getFieldValue(this));
  resetForm(this);
};

//Pieces that pushes to HTML
var handleStringPush = function(snapshot){
  updateStrings(snapshot);
}
//-------------------------------------------------------------------


//Bind Event Handler
//on pressing submit, push string to firebase, and reset the form 
$(@REALform).submit(handleStringSubmit);

//on pressing submit, push string through Azure and Spotify APIs 
$(@REALform).submit();

//Pushes other user entries to HTML on firebase update
StringsRef.on("child_added", handleStringPush);

//on click of any old search, push text to string
$("#pastSearch").click(@pushTextToForm);

//event listener for usePastSearch
$("#stringHolder").on("click", '.pastSearch', usePastSearch);

//------------------------------------------------------------------- 