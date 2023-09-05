var audioBlue = new Audio("./sounds/blue.mp3");
var audioGreen = new Audio("./sounds/green.mp3");
var audioRed = new Audio("./sounds/red.mp3");
var audioYellow = new Audio("./sounds/yellow.mp3");
var audioWrong = new Audio("./sounds/wrong.mp3");
var level = 0;
var computerSoundArray = [];
var userSoundArray = [];
var gameIsOn = false;

function displayLevel(){
    $("#level-title").text("Level " + level);
}

function setUserSoundArrayToZero(){
    userSoundArray = [];
}

function setComputerSoundArrayToZero(){
    computerSoundArray = [];
}

function greenPlay(){
    audioGreen.play();
    $("#green").addClass("pressed");
    setTimeout(() => {
        $("#green").removeClass("pressed");
    }, 300);
}

function redPlay(){
    audioRed.play();
    $("#red").addClass("pressed");
    setTimeout(() => {
        $("#red").removeClass("pressed")
    }, 300);
}

function yellowPlay(){
    audioYellow.play();
    $("#yellow").addClass("pressed");
    setTimeout(() => {
        $("#yellow").removeClass("pressed")
    }, 300);
}

function bluePlay(){
    audioBlue.play();
    $("#blue").addClass("pressed");
    setTimeout(() => {
        $("#blue").removeClass("pressed")
    }, 300);
}

function playButtonComputer(number){
    switch (number) {
        case 0:
            greenPlay();
            computerSoundArray.push(number);
            break;
        case 1:
            redPlay();
            computerSoundArray.push(number);
            break;
        case 2:
            yellowPlay();
            computerSoundArray.push(number);
            break;
        case 3:
            bluePlay();
            computerSoundArray.push(number);
            break;
        default:
            console.log(`Default executed in function: playButtonComputer(${number}).`)
            break;
    }
}

$("#green").on("click", function(){
    if (gameIsOn){
        greenPlay();
        userSoundArray.push(0)
        check();
    }
});

$("#red").on("click", function(){
    if (gameIsOn){
        redPlay();
        userSoundArray.push(1);
        check();
    }
});

$("#yellow").on("click", function(){
    if (gameIsOn){
        yellowPlay();
        userSoundArray.push(2);
        check();
    }

});

$("#blue").on("click", function(){
    if (gameIsOn){
        bluePlay();
        userSoundArray.push(3);
        check();
    }

});

function start(){
    $("body").on("keydown", function(e) {
        var letter = e.key.toLowerCase();
        console.log(letter)
        if (letter == "s"){
            gameIsOn = true;
            computerPlay();
        }
    })
}

function gameOver(){
    gameIsOn = false;
    setComputerSoundArrayToZero();
    $("#level-title").text("Game Over");
    level = 0;
    audioWrong.play();
    $("body").addClass("game-over");
    document.querySelector("#level-title").style.color ="red";
    setTimeout(() => {
        document.querySelector("#level-title").style.color ="#FEF2BF";
        $("body").removeClass("game-over");
        
    }, 3000);
    setTimeout(() => {
        $("#level-title").text("Play Again? Type 's'.");
    }, 3000); 
}

function computerPlay(){
    displayLevel();
    setUserSoundArrayToZero();
    setTimeout(() => {
        playButtonComputer(Math.floor(Math.random() * 4))
    }, 1000);
}

function check(){
    for (var i = 0; i < userSoundArray.length; i++ ){
        if (userSoundArray[i] != computerSoundArray[i]){
            gameOver();
        }
    }
    if (userSoundArray.length == computerSoundArray.length){
        level++;
        computerPlay();
    }
}

start();






