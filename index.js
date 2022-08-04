var started = false;
const buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var level = 0;

var index = 0;

$(document).keydown(function (e) { 
  if (e.key == "a" && !started){
    level = 0;
    index = 0;
    userPattern = [];
    gamePattern = [];
    $("body").removeClass("game-over");
    $(".sub-title").addClass("hidden");
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

var userColor;
$(".btn").click(function(e){
  userColor = e.target.id;
  userPattern.push(userColor);
  if (!checkAnswer(index++)){
    pressAnimation(userColor);
    playSound(userColor);
  }
});


//Functions:
function nextSequence(){
  $("#level-title").text(`Level ${++level}`);
  index = 0;
  userPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomColour = buttonColours[randomNumber];
  gamePattern.push(randomColour);
  buttonAnimation(randomColour);
}

function buttonAnimation(color){
  $(`#${color}`).fadeOut(100).fadeIn(100);
  playSound(color);
}
function playSound(color){
  var audio = new Audio(`sounds/${color}.mp3`);
  audio.play();
}

function pressAnimation(color){
  $(`#${color}`).addClass("pressed");
  setTimeout(function(){$(`#${color}`).removeClass("pressed");}, 100);
}

function checkAnswer(index){
  if (userPattern[index] == gamePattern[index]){
    pass();
  } else{
    gameOver();
    return 1;
  }

  if (index == gamePattern.length-1){
    setTimeout(function(){nextSequence();}, 1000);
  }
}

function pass(){}
function gameOver(){
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("#level-title").text("Game Over");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
  $(".sub-title.one").text(`You reached level ${level}!`);
  $(".sub-title").removeClass("hidden");
  started = false;
}



