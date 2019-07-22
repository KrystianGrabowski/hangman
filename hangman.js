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
        keyBoardStructure += '<div class="character" onclick="checkIfCharacterExists(' + 
                                i + ')">' + alphabet.charAt(i) + '</div>';
        if ((i+1) % 7 == 0) keyBoardStructure += '<div style="clear: both"></div>';  
    }
    document.getElementById("alphabet").innerHTML = keyBoardStructure;
}

String.prototype.replaceCharacter = function(position, character){
    if (position >= length || position < 0) return this.toString();
    return this.substr(0, position) + character + this.substr(position + 1);
}

function checkIfCharacterExists(charNum){
    var selectedCharacter = alphabet.charAt(charNum);
    for(i=0; i<length; i++){
        if (sentence.charAt(i) == selectedCharacter){
            userSentence = userSentence.replaceCharacter(i, selectedCharacter);
        }
    }
    console.log(userSentence);
    showSentence();
}

function start(){
    showSentence();
    showKeyboard();
}

window.onload = start;