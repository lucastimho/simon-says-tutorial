buttonColours = ["red", "blue", "green", "yellow"];
function nextSequence() {
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    return randomChosenColour;
}