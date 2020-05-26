var squares = document.querySelectorAll(".square");
var newColorsButton = document.querySelector("#new-color");
var colorValue = document.querySelector("#color");
var message = document.querySelector("#message");
var winBackground = document.querySelector("#header");
var easy = document.querySelector("#easy");
var hard = document.querySelector("#hard");
var squaresNum = 6;
var color = [0, 1, 2];
var colors = [];

//start game

function randomizer(min, max){
  return Math.floor(Math.random() * (max - min) + min);
};

function randomColor(){ 
  for (var i = 0; i < color.length; i++){
    color[i] = randomizer(0, 256);
 }; 
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
};

function getColArr(num){
  var arr = [];
  for(var i = 0; i < num; i++){
    arr.push(randomColor());
  }; 
  return arr;
}

function painter(max){
  colors = getColArr(max); 
  for (var i = 0; i < max; i++){        
    squares[i].style.backgroundColor = colors[i];    
  };
  colorValue.textContent = colors[randomizer(0, max)];  
};

//painter(6);
gameStarter();
gameLogic();
buttonColorTogler(hard);

//Interactive part
function gameLogic(){
  for (var i = 0; i < squares.length; i++){
    squares[i].addEventListener("click", function(){
      var clicked = this.style.backgroundColor;
      if(colorValue.textContent === String(clicked)){
        message.textContent = "CORRECT!";
        newColorsButton.textContent = "Play Again?";
        colorChanger(colorValue.textContent);
      }
      //GAME OVER
      else {
        this.style.backgroundColor = "#232323";
        message.textContent = "TRY AGAIN!";
      };
    });
  };
  newColorsButton.addEventListener("click", function(){
    gameUpdater();
    gameStarter();
  });
};

function gameUpdater(){
    newColorsButton.textContent = "New color";
    winBackground.style.backgroundColor = "purple";
    message.textContent = "";
    gameStarter();
}

function colorChanger(col){
  winBackground.style.backgroundColor = col;
  squares.forEach(function(s) {
    s.style.backgroundColor = col;
  }); 
};

//PLAYER ITERATION
//EASY/HARD MODES AND RESET BUTTON

easy.addEventListener("click", function(){
  buttonColorTogler(easy);
  gameStarter();
  gameUpdater();
  
  for(var i = 0; i < squares.length; i++){
    if(colors[i]){
        squares[i].style.backgroundColor = colors[i];        
      } else {squares[i].style.display = "none"};
    };
  });

hard.addEventListener("click", function(){
  buttonColorTogler(hard);
  gameStarter();
  gameUpdater(); 
  for(var i=0; i < squares.length; i++){
    squares[i].classList.add("square");
    squares[i].style.display = "";
    squares[i].style.backgroundColor = colors[i];
  };   
});

newColorsButton.addEventListener("click", function(){
  gameStarter();
  message.textContent = "";  
  gameLogic();
});

function buttonColorTogler(mode){
  if(mode === easy) {
    easy.classList.add("game-mode");
    hard.classList.remove("game-mode");
  } else {
    hard.classList.add("game-mode");
    easy.classList.remove("game-mode");
  };  
};

function gameStarter(){
  if (easy.classList.value === ""){
    painter(6);
  } else {
    painter(3);
  }
};


