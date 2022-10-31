const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const clouds = document.querySelector(".clouds");
const gameOverModal = document.querySelector(".gameOver_Modal");
const audioStart = new Audio("./audio/theme.mp3");
const audioGameOver = new Audio("./audio/gameover.mp3");
const audiojump = new Audio("./audio/maro-jump-sound-effect_1.mp3");
const score = document.querySelector("#score");
let scorCouter = 0;
let velocity = 2;

function start() {
  audioStart.play();
  mario.src = "./assets/mario.gif";
  pipe.style.right = "none";

  pipe.style.animation = "pipeAnimation 1.5s infinite linear";

  clouds.style.animation = "cloudsAnimation 20s infinite linear";
  clouds.style.right = "none";

  mario.style.width = "150px";
  mario.style.marginLeft = "50px";

  const ScoreInterval = setInterval(() => {
    scorCouter++;
    const scorFormat = scorCouter.toLocaleString("en-US", {
      minimumIntegerDigits: 5,
      useGrouping: false,
    });
    score.textContent = `${scorFormat}`;
  }, 1000);

  const loop = setInterval(() => {
    const cloudsPosition = clouds.offsetLeft;
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window
      .getComputedStyle(mario)
      .bottom.replace("px", "");

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      audioGameOver.play();
      pipe.style.animation = "none";
      pipe.style.left = `${pipePosition}px`;

      mario.style.animation = "none";
      mario.style.bottom = `${marioPosition}px`;

      mario.src = `./assets/game-over.png`;

      mario.style.width = "75px";
      mario.style.marginLeft = "50px";

      clouds.style.animation = "none";
      clouds.style.left = `${cloudsPosition}px`;

      clearInterval(loop);
      clearInterval(ScoreInterval);

      gameOverModal.style.display = "flex";
      audioStart.pause();
    }
  }, 10);
}

document.addEventListener("keydown", start);

function restartGame() {
  document.location.reload(true);
}

const jump = () => {
  mario.classList.add("jump");
  audiojump.play();

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 600);
};

document.addEventListener("keydown", jump);
