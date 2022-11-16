var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

function startOver(){
  level = 0;
  gamePattern = [];
  gameStart = false;
}

$(document).keypress(function() {
   startOver();
  if (!gameStart) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStart = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if(userClickedPattern.length === gamePattern.length) {
          setTimeout(function(){
            nextSequence()
          },1000);
        }
      }
    else{
      var wrong = new Audio ("sounds/wrong.mp3");
      wrong.play();

      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over")
      }, 200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
    }
    }


function nextSequence() {
userClickedPattern = [];

  level++
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}



function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}
