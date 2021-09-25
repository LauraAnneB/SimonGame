

let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;


$(document).keydown(function(){
  if (started === false){
    $("h1").text("Level " + level);
    started = !started;
    nextSequence();
  }
});

$(".btn").on("click", function(event){
    let userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence()
      }, 1000);
    }
  } else {
    playSound("wrong");
    $(document.body).addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
    	$(document.body).removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level );
  let randomNumber = Math.floor(Math.random()*4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function startOver(){
  gamePattern = [];
  level = 0;
  started = false;
}

function playSound(name){

  let randomColourAudio = new Audio("sounds/"+ name +".mp3");
  randomColourAudio.play();

}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
  	$("#"+currentColour).removeClass("pressed");
  }, 100);
}
