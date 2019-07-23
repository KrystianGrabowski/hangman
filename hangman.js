var sentence = "";
var userSentence = ""; 
var length = 0;
var imageNumber = 0;

const alphabet = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŻŹ";
const MAX_IMAGE_NUMBER = 8; 

//temp categories
var categories = {
    "jedzenie": ["banan", "spaghetti", "pierogi"],
    "zawód": ["hydraulik", "informatyk", "maszynista"],
    "państaw": ["macedonia", "afganistan", "watykan"],
    "przysłowia": ["co za dużo to niezdrowo", "nosił wilk razy kilka ponieśli i wilka", "baba z wozu koniom lżej"]
}

function setCategory(categoryId){
    var categoryArray = categories[categoryId];
    sentence = categoryArray[Math.floor(Math.random()*categoryArray.length)];
    sentence = sentence.toUpperCase();
    length = sentence.length;
    userSentence = createSentenceToShow();
    showKeyboard();
    showSentence();
}

function showCategories(){
    var categoriesList = "Kategorie:</br></br>";
    Object.keys(categories).forEach(function(category){
        var clickAction = "setCategory('" + category + "')";
        categoriesList += "<div id=" + category + "' class='categoryItem' onclick=" + clickAction + ">" + category + "</div>";
    });
    document.getElementById("alphabet").innerHTML = categoriesList;
}

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

function FadeElement(name){
    $("#" + name).fadeOut(2000);
}

function winInfo(){
    var resetButton = "<div class='resetButton' onclick='location.reload()'>Zagraj ponownie</div>";
    var x = "Przegrana!<br/>Prawidłowe hasło to:<br/>" + sentence + "</br></br>" + resetButton;
    document.getElementById("alphabet").innerHTML = x;
    $("#alphabet").fadeIn(2000);
}

function loseInfo(){
    var resetButton = "<div class='resetButton' onclick='location.reload()'>Zagraj ponownie</div>";
    var x = "Gratulacje!<br/>Podano prawidłowe hasło</br></br>" + resetButton;
    document.getElementById("alphabet").innerHTML = x;
    $("#alphabet").fadeIn(2000);
}


function checkLose(){
    if (imageNumber == MAX_IMAGE_NUMBER){
        lockAllKeys();
        FadeElement("alphabet");
        setTimeout("winInfo()", 2000);
    }
}

function checkWin(){
    if (sentence == userSentence){
        lockAllKeys();
        FadeElement("alphabet");
        setTimeout("loseInfo()", 2000);
    }
}

function nextImage(){
    imageNumber++;
    document.getElementById("hangmanImage").innerHTML = "<img src='images/img" + imageNumber + ".png' width='500' alt=''/>"
    checkLose();
}

function lockKey(charNum){
    var keyId = "key" + charNum;
    document.getElementById(keyId).setAttribute("onclick", ";");
    document.getElementById(keyId).style.cursor = "default";
}

function keyCorrectAnswer(charNum){
    var keyId = "key" + charNum;
    document.getElementById(keyId).style.background = "#002A00";
    document.getElementById(keyId).style.border = "2px solid #00AA00";
    document.getElementById(keyId).style.color = "#00AA00";
    lockKey(charNum);
}

function keyWrongAnswer(charNum){
    var keyId = "key" + charNum;
    document.getElementById(keyId).style.background = "#2A0000";
    document.getElementById(keyId).style.border = "2px solid #AA0000";
    document.getElementById(keyId).style.color = "#AA0000";
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
    showCategories();
}

window.onload = start;