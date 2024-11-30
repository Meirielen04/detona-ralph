const state = {
 view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeleft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
 }  ,
 values: {
    gamerVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currenttime:60,
 },
 actions:{
    timerid:setInterval(randomSquare, 1000),
    countDownTimerId: setInterval (countDown,1000),
 }
};

function countDown () {
    state.values.currenttime--;
    state.view.timeleft.textContent = state.values.currenttime;

    if(state.values.currenttime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerid);
        alert("Game over! O seu resultado foi: " + state.values.result);
    }
}

function playSound(){
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function randomSquare (){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
    
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;

}


function addListenerHitBox (){
   state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
        if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
        }
        });
      });
}
function initialize() {
    addListenerHitBox();
}

initialize();