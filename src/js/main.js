
let redTile= document.getElementById("1");
let blueTile= document.getElementById("2");
let greenTile= document.getElementById("3");
let yellowTile= document.getElementById("4");
let score = document.getElementById("score");
let serie=[];
let round=0;
let responses=[];
let audio = document.getElementById("audio");

let audiotrack = ['../audio/simonSound1.mp3', '../audio/simonSound2.mp3', '../audio/simonSound3.mp3','../audio/simonSound4.mp3'];
let wrongAnswer = '../audio//buzzer2.wav';


let touches = document.getElementsByTagName('rect');
Array.from(touches).forEach(element => {
  element.addEventListener('click', checkSound);
  element.addEventListener('mouseout', mouseOut);
  element.addEventListener('mouseover', mouseIn);
  console.log(element);
});


function mouseIn(e) {
  switch (e.target.id) {
    case "green":
      greenTile.style.strokeOpacity = 0.8
    break;
    case "red":
      redTile.style.strokeOpacity = 0.8
    break;
    case "yellow":
      yellowTile.style.strokeOpacity = 0.8
    break;
    case "blue":
      blueTile.style.strokeOpacity = 0.8
  }
}
  function mouseOut(e) {
    switch (e.target.id) {
      case "green":
        greenTile.style.strokeOpacity = 1
      break;
      case "red":
        redTile.style.strokeOpacity = 1
      break;
      case "yellow":
        yellowTile.style.strokeOpacity = 1
      break;
      case "blue":
        blueTile.style.strokeOpacity = 1
    }
}


function checkSound(tile) {
  audio.play();
responses.push(tile.srcElement.dataset.colorindex);
console.log(responses)
 for (let i=0; i<responses.length; i++) {
  if (Number(responses[i]) == serie[i]) {
    console.log("woooo");
    round+=1;
  }
  else {
   audio.src = wrongAnswer;
   audio.play();
   reponses=[];
  }
  playSound();
 }

}


function startGame() {
  resetGame();
  serie = initiateSerie();
  playSound();
}

function strictMode() {


}

function initiateSerie() {
  for (let i=0; i<20; i++){
    serie.push(Math.floor(Math.random() * 4) + 1)
  }
  console.log(serie);
  return serie;

}
function resetGame() {
  round=0
  serie=[];
  responses=[];
}

function playSound() {
  for(let i=0; i<round+1; i++) {

    setTimeout(function() {
      audio.src = audiotrack[serie[round]-1];
      audio.play();  
      let color = document.getElementById(serie[round]).getAttribute('stroke')
      let newColor = LightenDarkenColor(color, 60);
      document.getElementById(serie[round]).setAttribute('stroke', newColor);
      setTimeout(function() {document.getElementById(serie[round]).setAttribute('stroke', color)}, 1000);


    }, 2000);
 
  }
 

}


function LightenDarkenColor(col, amt) {
  
    var usePound = false;
  
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  
}