var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
$(".btn").click(function() {
    var userChosenColour = this.id;
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(level);
})
function playSound(name) {
    var audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
}
function animatePress(currentColour) {
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(function() {
        $(`#${currentColour}`).removeClass("pressed");
    }, 100);
}
$(document).keypress(function() {
    if (!started) {
        nextSequence();
        $("h1").text(`Level ${level}`);
        started = true;
    }
})
function checkAnswer(currentLevel) {
    if (userClickedPattern.length > 0 && userClickedPattern[0] === gamePattern[gamePattern.length - 1]) {
      userClickedPattern = []
      currentLevel++;
      setTimeout(nextSequence(), 2000);
    } else {
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() { $("body").removeClass("game-over")}, 200);
        gamePattern = [];
        userClickedPattern = []
        $("h1").text("Game Over, Press any Key to Restart");
        startOver();
    }
}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}