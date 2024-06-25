let timer;
let isRunning = false;
let minutes = 25;
let seconds = 0;
let display = document.getElementById('display');

function updateDisplay() {
  display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  isRunning = true;
  timer = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(timer);
        isRunning = false;
        // Play alarm sound here if you have an alarm audio element
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    updateDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
}

function increaseVolume() {
  let audios = document.querySelectorAll('audio');
  audios.forEach(audio => {
    if (audio.volume < 1.0) {
      audio.volume += 0.1;
    }
  });
}

function decreaseVolume() {
  let audios = document.querySelectorAll('audio');
  audios.forEach(audio => {
    if (audio.volume > 0.0) {
      audio.volume -= 0.1;
    }
  });
}

document.getElementById('playButton').addEventListener('click', () => {
  if (!isRunning) {
    startTimer();
  }
});

document.getElementById('stopButton').addEventListener('click', () => {
  stopTimer();
});

document.getElementById('increaseVolume').addEventListener('click', () => {
  increaseVolume();
});

document.getElementById('decreaseVolume').addEventListener('click', () => {
  decreaseVolume();
});

function stopAllSounds() {
  let audios = document.querySelectorAll('audio');
  audios.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
}

function handleCardClick(audioId, imgId, hoverId) {
  const audioElement = document.getElementById(audioId);
  if (!audioElement.paused) {
    audioElement.pause();
    audioElement.currentTime = 0;
    document.getElementById(imgId).classList.remove("hidden");
    document.getElementById(hoverId).classList.add("hidden");
  } else {
    stopAllSounds();
    audioElement.play();
    document.getElementById(imgId).classList.add("hidden");
    document.getElementById(hoverId).classList.remove("hidden");
  }
}

document.getElementById('card1').addEventListener('click', () => {
  handleCardClick('sound1', 'img1', 'hover01');
});

document.getElementById('card2').addEventListener('click', () => {
  handleCardClick('sound2', 'img2', 'hover02');
});

document.getElementById('card3').addEventListener('click', () => {
  handleCardClick('sound3', 'img3', 'hover03');
});

document.getElementById('card4').addEventListener('click', () => {
  handleCardClick('sound4', 'img4', 'hover04');
});

updateDisplay();
