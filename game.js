buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
function nextSequence() {
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    return randomChosenColour;
}