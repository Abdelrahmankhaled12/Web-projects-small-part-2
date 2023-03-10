// Get Elements
let difficultyEl = document.getElementById("difficulty"),
    timeEl = document.getElementById("time"),
    scoreEl = document.getElementById("score"),
    endGameContainerEL = document.getElementById("end-game-container"),
    wordEl = document.getElementById("word"),
    textEL = document.getElementById("text"),
    settingsBtn = document.getElementById("settings-btn"),
    settingsEl = document.getElementById("settings"),
    settingFormEl = document.getElementById("setting-form");


// List of words for game
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
];

// Focus on text on start
textEL.focus();

// Init word
let wordRandom;

// Init score
let score = 0;

// Init time
let time = 10;

// Start counting down
let timeInterval = setInterval(upDateTime,1000);


// Set difficulty to value in ls or medium
let difficulty = localStorage.getItem("difficulty") !== null ? localStorage.getItem("difficulty") : "medium" ;

// Set difficulty select value
difficultyEl.value = localStorage.getItem("difficulty") !== null ? localStorage.getItem("difficulty") : "medium";

// Function Get Word Random
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Function Add Word in Dom
function addWordInDom() {
    wordRandom = getRandomWord();
    wordEl.innerHTML = wordRandom;
}
// Function Update Score
function updateScore() {
    score++;
    scoreEl.innerHTML = score;

}

// Game over, show end screen
function gameOver() {
    endGameContainerEL.innerHTML = ` 
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;

    endGameContainerEL.style.display = "flex";
}


// Function UpData Time
function upDateTime() {
    time--;
    timeEl.innerHTML = time + "s";

    // Stop Time 
    if(time === 0) {
        clearInterval(timeInterval);
        // Call Function Game Over
        gameOver();
    }
}

// Call Function Add Word in Dom
addWordInDom();

// Add Event Listener

// Typing
textEL.addEventListener("input",(e)=> {
    if(wordRandom === e.target.value) {
        addWordInDom();
        // UpDate Score
        updateScore();

        // clear input text
        e.target.value = "";

        // UpDate Time
        if(difficulty === "hard") {
            time+=2;
        }else if(difficulty === "medium") {
            time+=3
        }else {
            time+=5;
        }
    }
})

// Settings btn click
settingsBtn.addEventListener("click",()=>{
    settingsEl.classList.toggle("hide");
})

// Settings select
settingFormEl.addEventListener("change",(e)=> {
    difficulty = e.target.value;
    localStorage.setItem("difficulty",difficulty);
})