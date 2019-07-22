var sentence = "ala ma kota";
var length = sentence.length; 
sentence = sentence.toUpperCase();
var userSentence = createSentenceToShow();
var alphabet = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŻŹ";
var imageNumber = 0;
const MAX_IMAGE_NUMBER = 8; 

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
        keyBoardStructure += "<div class='character' onclick='checkIfCharacterExists(" + 
                                i + ")' id='key" + i + "'>" + alphabet.charAt(i) + "</div>";
        if ((i+1) % 7 == 0) keyBoardStructure += '<div style="clear: both"></div>';  
    }
    document.getElementById("alphabet").innerHTML = keyBoardStructure;
}

String.prototype.replaceCharacter = function(position, character){
    if (position >= length || position < 0) return this.toString();
    return this.substr(0, position) + character + this.substr(position + 1);
}

function insertHTML(index, message){
    document.getElementById(index).innerHTML = message;
    $("#alphabet").fadeIn(3000);
}

function FadeElement(name){
    $("#" + name).fadeOut(2000);
}

function checkLose(){
    if (imageNumber == MAX_IMAGE_NUMBER){
        lockAllKeys();
        FadeElement("alphabet");
        setTimeout("insertHTML('alphabet', 'Przegrana!<br/>Prawidłowe hasło to:<br/>" + sentence + "')", 2000);
    }
}

function checkWin(){
    if (sentence == userSentence){
        lockAllKeys();
        FadeElement("alphabet");
        setTimeout("insertHTML('alphabet', 'Gratulacje!<br/>Podano prawidłowe hasło')", 2000);
    }
}

function nextImage(){
    imageNumber++;
    document.getElementById("hangmanImage").innerHTML = "<img src='images/image" + imageNumber + ".png' width='500' alt=''/>"
    checkLose();
}

function lockKey(charNum){
    var keyId = "key" + charNum;
    document.getElementById(keyId).setAttribute("onclick", ";");
    document.getElementById(keyId).style.cursor = "default";
}

function keyCorrectAnswer(charNum){
    var keyId = "key" + charNum;
    document.getElementById(keyId).style.background = "green";
    lockKey(charNum);
}

function keyWrongAnswer(charNum){
    var keyId = "key" + charNum;
    document.getElementById(keyId).style.background = "red";
    lockKey(charNum);
}

function lockAllKeys(){
    for(i=0; i<35; i++){
        lockKey(i);   
    }
}

function checkIfCharacterExists(charNum){
    var selectedCharacter = alphabet.charAt(charNum);
    var characterFound = false;
    for(i=0; i<length; i++){
        if (sentence.charAt(i) == selectedCharacter){
            userSentence = userSentence.replaceCharacter(i, selectedCharacter);
            characterFound = true;
            checkWin();
        }
    }
    if (!characterFound){
        keyWrongAnswer(charNum);
        nextImage();
    } else{
        keyCorrectAnswer(charNum);
    }
    showSentence();
}

function start(){
    showSentence();
    showKeyboard();
}

window.onload = start;