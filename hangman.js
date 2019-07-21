var sentence = "ala ma kota";
var length = sentence.length; 
sentence = sentence.toUpperCase();
var userSentence = createSentenceToShow();

function createSentenceToShow(){
    var userSentence = "";
    for(i=0; i<length; i++){
        userSentence += sentence.charAt(i) == " " ? " " : "-"; 
    }
    return userSentence;
}

function showSentence(){
    document.getElementById("sentence").innerHTML = userSentence;
}

window.onload = showSentence;