

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
  document.getElementById(e.srcElement.dataset.colorindex).style.strokeOpacity = 0.9;
  
}
function mouseOut(e) {
    document.getElementById(e.srcElement.dataset.colorindex).style.strokeOpacity = 1; 
}

function checkSound(tile) {
  let ind = tile.srcElement.dataset.colorindex;
  if(playerTurn) {
  responses.push(ind);
  document.getElementById(ind).classList.toggle("sel"+ind);
  setTimeout(function() {document.getElementById(ind).classList.toggle("sel"+ind);}, 1200);
    if (Number(responses[long]) == serie[long]) {
      audio.src = audiotrack[ind-1];
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
      if (round==3) {
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
      document.getElementById(elem).classList.toggle("sel"+elem);
      setTimeout(function() {document.getElementById(elem).classList.toggle("sel"+elem);}, 1200);
    })
    .catch(error => { });
  }

}
