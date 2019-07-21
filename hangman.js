var sentence = "ala ma kota";
var length = sentence.length; 
sentence = sentence.toUpperCase();
var userSentence = createSentenceToShow();
var alphabet = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŻŹ";

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

function showKeyboard(){
    var keyBoardStructure = " ";
    for(i=0; i<35; i++){
        keyBoardStructure += '<div class="character">' + alphabet.charAt(i) + '</div>';
        if ((i+1) % 7 == 0) keyBoardStructure += '<div style="clear: both"></div>';  
    }
    document.getElementById("alphabet").innerHTML = keyBoardStructure;
}

function start(){
    showSentence();
    showKeyboard();
}

window.onload = start;