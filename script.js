const difficulty = document.getElementById("difficulty");
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const resetBtn = document.getElementById("resetBtn");

const message = document.getElementById("message");
const hint = document.getElementById("hint");
const attemptsDisplay = document.getElementById("attempts");
const rangeText = document.getElementById("rangeText");
const bestScoreDisplay = document.getElementById("bestScore");

let secretNumber;
let attempts = 0;
let maxNumber = 100;
let gameOver = false;

const settings = {
  easy: 50,
  medium: 100,
  hard: 500
};


// ======================================================
// 😂 MANJIRI ROAST DATABASE
// ======================================================

const lowRoasts = [
  "📈 Too low, Manjiri. Even your standards are higher than this.",
  "😭 That's too low. Your brain really said 'let's guess randomly.'",
  "📈 Go higher, madam. This isn't a basement.",
  "🤡 Nope. Were you even looking at the screen?",
  "🧠 Your brain needs an update.",
  "😂 That number is smaller than your chances of getting this right.",
  "📈 Higher! Come on, Manjiri. Use the two brain cells.",
  "😭 So close... actually no, not close at all.",
  "💀 Girl, that guess was emotionally disappointing.",
  "📈 Higher. I believe in you. Barely.",
  "🤦‍♂️ Manjiri.exe has stopped thinking.",
  "😂 Even your calculator would be embarrassed.",
  "📈 Try something bigger. Like your confidence.",
  "🥲 I'm starting to think I made this game too difficult for you.",
  "🧠 Please consult your remaining brain cell."
];

const highRoasts = [
  "📉 Too high, Manjiri. Calm down, NASA.",
  "😂 Who told you to aim THAT high?",
  "📉 Lower! Your confidence is higher than your accuracy.",
  "🤡 That's not it, genius.",
  "😭 Girl... numbers are not your thing, are they?",
  "📉 Go lower. Way lower. Like your IQ right now.",
  "😂 Your guess has more confidence than correctness.",
  "🧠 The brain cell is struggling today.",
  "📉 Nope. Maybe close your eyes and try again? 😂",
  "💀 That guess was criminal.",
  "😭 Manjiri, please stop embarrassing yourself.",
  "📉 Lower! Even I know that and I'm not playing.",
  "🤦‍♂️ Are you guessing or conducting a scientific experiment?",
  "😂 Bold guess. Terrible guess.",
  "📉 Somewhere down there is the correct answer. Find it, detective."
];

const generalRoasts = [
  "😂 Another attempt? I admire the confidence.",
  "💀 Manjiri is fighting for her life against a number.",
  "😭 This is getting difficult to watch.",
  "🤡 Professional guesser. Amateur thinker.",
  "😂 Your brain called. It wants a vacation.",
  "🧠 Loading... please wait...",
  "💀 At this point, the number is bullying you.",
  "🥲 I love you, but this performance is concerning.",
  "😂 Don't worry. I'll pretend that was a good guess.",
  "😭 The number is hiding from you on purpose now.",
  "🤦‍♂️ We need to have a serious conversation about your guessing skills.",
  "💀 Girl, the number isn't even moving.",
  "😂 You vs. a random number. And somehow it's competitive.",
  "🧠 Brain cells currently unavailable. Please try later.",
  "🥹 I knew you were cute, but I didn't know you were this confused.",
  "😂 You're making this game way more entertaining than expected.",
  "💀 Your guessing strategy appears to be 'hope'.",
  "😭 Maybe ask your imaginary smart friend for help.",
  "😂 At least you're consistent... consistently wrong.",
  "🫠 I'm starting to question who the dumb one really is."
];

const threeAttemptRoasts = [
  "😭 THREE attempts already?! Manjiri please.",
  "💀 3 guesses and we're still here.",
  "😂 Three attempts. Zero dignity.",
  "🧠 Your brain cell is working overtime."
];

const fiveAttemptRoasts = [
  "💀 FIVE attempts?! Should I call someone?",
  "😭 Manjiri... this is becoming a documentary.",
  "😂 We've entered the 'just guessing things' phase.",
  "🤡 Congratulations on five wrong life decisions."
];

const sevenAttemptRoasts = [
  "🚨 SEVEN ATTEMPTS. THIS IS AN EMERGENCY.",
  "💀 Girl, the number has started feeling bad for you.",
  "😭 I'm beginning to think you're doing this on purpose.",
  "😂 At this point, just pick your favorite number."
];


// ======================================================
// 🎲 RANDOM MESSAGE FUNCTION
// ======================================================

function randomMessage(array) {
  return array[Math.floor(Math.random() * array.length)];
}


// ======================================================
// 🎮 START GAME
// ======================================================

function startGame() {

  maxNumber = settings[difficulty.value];

  secretNumber =
    Math.floor(Math.random() * maxNumber) + 1;

  attempts = 0;
  gameOver = false;

  attemptsDisplay.textContent = "0";

  rangeText.textContent =
    `1 - ${maxNumber}`;

  guessInput.value = "";

  guessInput.max = maxNumber;

  guessInput.placeholder =
    `Enter 1-${maxNumber}`;

  message.textContent =
    "Okay Manjiri... prove that you have a brain. 😭";

  message.className =
    "rounded-2xl bg-gray-100 p-5 text-center text-gray-600 font-bold min-h-[90px] flex items-center justify-center";

  hint.textContent =
    "💡 Hint: Somewhere between 1 and your limited intelligence.";

  guessBtn.disabled = false;

  guessBtn.classList.remove(
    "opacity-50",
    "cursor-not-allowed"
  );

  guessInput.focus();
}


// ======================================================
// 🎯 CHECK GUESS
// ======================================================

function checkGuess() {

  if (gameOver) return;

  const guess = Number(guessInput.value);


  // Invalid number
  if (
    !guess ||
    guess < 1 ||
    guess > maxNumber
  ) {

    message.textContent =
      `⚠️ Manjiri... enter a number between 1 and ${maxNumber}. It's literally written there. 😭`;

    message.className =
      "shake rounded-2xl bg-red-100 p-5 text-center text-red-600 font-bold min-h-[90px] flex items-center justify-center";

    return;
  }


  attempts++;

  attemptsDisplay.textContent = attempts;


  // ==================================================
  // 🏆 CORRECT
  // ==================================================

  if (guess === secretNumber) {

    gameOver = true;

    let winMessages = [
      `🎉 WAIT... YOU GOT IT?! Even I'm shocked. 😭❤️`,
      `🏆 SHE DID IT! Someone document this historic moment.`,
      `😂 FINALLY! The brain cell has returned!`,
      `🥹 You actually guessed it! I'm proud of you, dumbass ❤️`,
      `🎯 CORRECT! Okay okay, maybe you're not completely dumb.`,
      `💗 YOU WON! I knew you could do it... eventually.`,
      `🚨 BREAKING NEWS: MANJIRI HAS USED HER BRAIN.`,
      `👑 Queen Manjiri has defeated one random number.`,
      `😭 I'm so proud. I might even call you smart today.`,
      `❤️ Correct! Fine, you're cute AND slightly intelligent.`
    ];

    message.textContent =
      randomMessage(winMessages);

    message.className =
      "pop rounded-2xl bg-green-100 p-5 text-center text-green-600 font-black min-h-[90px] flex items-center justify-center";

    hint.textContent =
      `🎊 The answer was ${secretNumber}. You survived ${attempts} attempt${attempts === 1 ? "" : "s"}!`;

    saveBestScore();

    guessBtn.disabled = true;

    guessBtn.classList.add(
      "opacity-50",
      "cursor-not-allowed"
    );

    return;
  }


  // ==================================================
  // 😂 WRONG GUESS
  // ==================================================

  let roast;

  if (attempts === 3) {

    roast = randomMessage(threeAttemptRoasts);

  } else if (attempts === 5) {

    roast = randomMessage(fiveAttemptRoasts);

  } else if (attempts === 7) {

    roast = randomMessage(sevenAttemptRoasts);

  } else if (guess < secretNumber) {

    roast = randomMessage(lowRoasts);

  } else {

    roast = randomMessage(highRoasts);
  }


  message.textContent = roast;

  message.className =
    "pop rounded-2xl bg-pink-100 p-5 text-center text-pink-600 font-black min-h-[90px] flex items-center justify-center";


  // Dynamic hints
  if (guess < secretNumber) {

    hint.textContent =
      randomMessage([
        "💡 Hint: Go higher, genius.",
        "💡 The answer is bigger than that.",
        "💡 Think bigger. Much bigger.",
        "💡 Higher! Your brain can do this.",
        "💡 The number is above your guess 👆",
        "💡 More! More! MORE!",
        "💡 Your guess needs to grow up."
      ]);

  } else {

    hint.textContent =
      randomMessage([
        "💡 Hint: Go lower, Einstein.",
        "💡 The answer is smaller than that.",
        "💡 Bring that confidence down.",
        "💡 Lower! Trust me, for once.",
        "💡 The number is below your guess 👇",
        "💡 You're aiming way too high.",
        "💡 Less! Your guess is doing too much."
      ]);
  }


  guessInput.value = "";

  guessInput.focus();
}


// ======================================================
// 🏆 BEST SCORE
// ======================================================

function saveBestScore() {

  let bestScore =
    localStorage.getItem("manjiriBestScore");

  if (
    !bestScore ||
    attempts < Number(bestScore)
  ) {

    localStorage.setItem(
      "manjiriBestScore",
      attempts
    );

    bestScoreDisplay.textContent =
      `${attempts} attempt${attempts === 1 ? "" : "s"}`;

  } else {

    bestScoreDisplay.textContent =
      `${bestScore} attempt${Number(bestScore) === 1 ? "" : "s"}`;
  }
}


// Load previous score
const savedScore =
  localStorage.getItem("manjiriBestScore");

if (savedScore) {

  bestScoreDisplay.textContent =
    `${savedScore} attempt${Number(savedScore) === 1 ? "" : "s"}`;
}


// ======================================================
// 🎮 EVENTS
// ======================================================

guessBtn.addEventListener(
  "click",
  checkGuess
);

resetBtn.addEventListener(
  "click",
  startGame
);

difficulty.addEventListener(
  "change",
  startGame
);

guessInput.addEventListener(
  "keydown",
  function (event) {

    if (event.key === "Enter") {
      checkGuess();
    }

  }
);


// Start
startGame();

