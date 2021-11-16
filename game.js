
var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;

function nextSequence() {
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(300).fadeIn(300);
  playSound(randomChosenColour);
  $("h1").text("Level " + level);
  level++;
}

$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
  var audio = new Audio ("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
      $("#" + currentColour).removeClass("pressed");
    }, 100);
  };

$(document).keypress(function(event) {
  if (!started) {
    nextSequence();
    started = true;
  }
})

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function() {
          nextSequence();
        }, 1000);
        userClickedPattern = [];
        console.log("Success");
      } else {
        console.log("Waiting");
      }
  } else {
    var audio = new Audio ("sounds/wrong.mp3");
    audio.play();
    $("body").toggleClass("game-over");
    setTimeout(function() {
      $("body").toggleClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
