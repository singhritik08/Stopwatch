let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let interval;
let lapTimes = [];

const timeDisplay = document.getElementById('timeDisplay');
const startStopButton = document.getElementById('startStop');
const lapButton = document.getElementById('lap');
const resetButton = document.getElementById('reset');
const lapList = document.getElementById('lapList');

function formatTime(time) {
  const hours = String(Math.floor(time / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
  const seconds = String(time % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function updateTime() {
  elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  timeDisplay.textContent = formatTime(elapsedTime);
}

function startStop() {
  if (isRunning) {
    clearInterval(interval);
    startStopButton.textContent = 'Start';
  } else {
    startTime = Date.now() - elapsedTime * 1000;
    interval = setInterval(updateTime, 1000);
    startStopButton.textContent = 'Stop';
  }
  isRunning = !isRunning;
}

function reset() {
  clearInterval(interval);
  isRunning = false;
  elapsedTime = 0;
  timeDisplay.textContent = formatTime(elapsedTime);
  startStopButton.textContent = 'Start';
  lapTimes = [];
  lapList.innerHTML = '';
}

function recordLap() {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    lapTimes.push(lapTime);

    const lapItem = document.createElement('div');
    lapItem.classList.add('lap-item');
    lapItem.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
    
    lapList.appendChild(lapItem);
  }
}

startStopButton.addEventListener('click', startStop);
lapButton.addEventListener('click', recordLap);
resetButton.addEventListener('click', reset);
