
let redTile= document.getElementById("1");
let blueTile= document.getElementById("2");
let greenTile= document.getElementById("3");
let yellowTile= document.getElementById("4");
let score = document.getElementById("score");
let serie=[];
let playerTurn = false;
let strictMode=false;
let round=[0];
let long=0;
let color;
let speed = 1500;
let responses=[];
let audio = document.getElementById("audio");

let audiotrack = ['../audio/simonSound1.mp3', '../audio/simonSound2.mp3', '../audio/simonSound3.mp3','../audio/simonSound4.mp3'];
let wrongAnswer = '../audio//buzzer2.wav';


let touches = document.getElementsByTagName('rect');
Array.from(touches).forEach(element => {
  element.addEventListener('click', checkSound);
  element.addEventListener('mouseout', mouseOut);
  element.addEventListener('mouseover', mouseIn);
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
  if(playerTurn) {
  responses.push(tile.srcElement.dataset.colorindex);
  console.log(responses);

    if (Number(responses[long]) == serie[long]) {
      audio.src = audiotrack[tile.srcElement.dataset.colorindex-1];
      long+=1;
    }
    else {
      audio.src = wrongAnswer;
      responses=[];
      long=0;
      if ( strictMode) {
        resetGame();

      }
      else if (!strictMode){
        setTimeout(function() {playTrack()}, 2000);
      }
    }
    playSound();

    if (responses.length == round.length) {
      playerTurn=false;
      if (round===20) {
        score.innerHTML="WIN";
        setTimeout(function() {startGame()}, 5000);
      }
      else { 
        if (round>=13) {
        speed=900;
        }
        else if (round>=9) {
          speed=1000;
        }
        else if (round>=5) {
          speed=1000;
        }
      responses=[];
      console.log("woooo");
      score.innerHTML=round.length;
      round.push(round.length);
      long=0;
      setTimeout(function() {playTrack()}, 2000);
      }
    
    }
  }
}

function startGame() {
  resetGame();
  serie = initiateSerie();
}

function strictModel() {
  document.getElementsByClassName("btnStrict")[0].classList.toggle( "selected" );
  strictMode = strictMode ? false : true;
}

function initiateSerie() {
  serie=[];
  for (let i=0; i<20; i++){
    serie.push(Math.floor(Math.random() * 4) + 1)
  }
  return serie;

}
function resetGame() {
  round=[0];
  responses=[];
  score.innerHTML="0";
  setTimeout(function() {playTrack()}, 2000);
}

function playTrack() {
  var y=0;
  function nextTrack() {
    audio.src = audiotrack[serie[y]-1];
    playSound(serie[y]);
    y++;
    if (y<round.length) {
      setTimeout(nextTrack, speed);
    }
    else if (y === round.length) {
      playerTurn=true;
    }
  }
  nextTrack();
  }

function playSound(elem) {
    var playPromise = audio.play(); 
    
  if (playPromise !== undefined) {
    playPromise.then(_ => {
      color = document.getElementById(elem).getAttribute('stroke')
      let newColor = LightenDarkenColor(color, 60);
      document.getElementById(elem).setAttribute('stroke', newColor);
      setTimeout(function() {document.getElementById(elem).setAttribute('stroke', color)}, 1200);
   
    })
    .catch(error => {

    });
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