var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playEntireSequence();
}
var i = 0;
function playEntireSequence() {
  setTimeout(function () {
    var audio = new Audio(`./sounds/${gamePattern[i]}.mp3`);
    $(`#${gamePattern[i]}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    audio.play();
    i++;
    if (i < gamePattern.length) {
      playEntireSequence();
    }
  }, 1000);
}
$(".btn").click(function () {
  var userChosenColour = this.id;
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(level);
});
function playSound(name) {
  var audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
}
function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}
$(document).keypress(function () {
  if (!started) {
    nextSequence();
    $("h1").text(`Level ${level}`);
    started = true;
  }
});
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
  }
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  i = 0;
}
