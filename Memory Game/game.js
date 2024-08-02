//Store available colors, game pattern, and users pattern
var buttonPositions = ["Top-Left", "Top-Mid", "Top-Right", "Mid-Left", "Mid-Mid", "Mid-Right", "Bot-Left", "Bot-Mid", "Bot-Right"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var started = false;
var usersTurn = false;

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    usersTurn = false;
}

//Play button sound
function playSound(){
    var audio = new Audio("sounds/pressNoise.mp3");
    audio.play();
}

//Animate user button press
function animatePress(buttonPosition){
    $("#" + buttonPosition).addClass("pressed");
    setTimeout(function() {
        $("#" + buttonPosition).removeClass("pressed");
    }, 100);
}

//Display color pattern to user
function showPattern(index = 0, callback) {
    if (index < gamePattern.length) {
        const buttonPosition = gamePattern[index];
        $("#" + buttonPosition).fadeOut(100).fadeIn(100); 
        playSound(); 

        setTimeout(function() {
            showPattern(index + 1, callback);  
        }, 400);  
    }
    else {
        if (typeof callback === "function") {
            callback();
        }
    }
}

//Generate next color in sequnece at random
function nextSequence(){
    usersTurn = false;
    userPattern = []; //Reset users pattern each level
    level++;
    $("h1").html("LVL " + level);

    var randomNumber = Math.floor(Math.random() * 9);
    var randomChosenPosition = buttonPositions[randomNumber];
    gamePattern.push(randomChosenPosition);
    showPattern(0, function(){
        usersTurn = true;
    });
}

//Check if user is correct
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userPattern[currentLevel]){
        if (userPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 500);
        }
    }
    else{
        $("body").addClass("game-over");
        $("h1").html("GAME OVER, Press Any Key to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

//Checks which color was pressed by user
$(".btn").on("click", function(){
    if (usersTurn){
        var userChosenColor = this.id;

        playSound();
        animatePress(userChosenColor);

        userPattern.push(userChosenColor);
        checkAnswer(userPattern.length-1);
    }
});

//Starts when user presses a key
$(document).on("keydown", function(){
    if (!started){
        started = true;
        nextSequence();
    }
});

