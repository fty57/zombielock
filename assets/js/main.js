document.addEventListener('DOMContentLoaded', () => {
  // --- Variáveis de Estado do Jogo ---
  let timeRemaining = 600; // 60 minutos em segundos (MM:SS)
  let timerInterval;
  let isPaused = true;
  let isMuted = true;

  // --- Efeito Sonoro ---
  const buttonSound = new Audio('./assets/sounds/sound_click.wav');
  const ambienceSound = new Audio('./assets/sounds/sound_dark.mp3')
  ambienceSound.loop = true;

  // --- Elementos do DOM ---
  const timerDisplay = document.getElementById('timer-display');
  const pausePlayButton = document.getElementById('pause-play-button');
  const pausePlayIcon = pausePlayButton.querySelector('i');
  const muteButton = document.getElementById('mute-button');
  const muteIcon = muteButton.querySelector('i');

  // --- Funções de Ajuda ---
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function updateDisplay() {
    timerDisplay.textContent = formatTime(timeRemaining);
  }

  function startTimer() {
    if (timerInterval) return; // Já está rodando

    timerInterval = setInterval(() => {
      if (!isPaused) {
        timeRemaining--;
        updateDisplay();

        if (timeRemaining <= 10) {
          timerDisplay.style.color = 'var(--color-timer-red)';
          timerDisplay.style.boxShadow = '0 0 20px var(--color-timer-red)';
        } else if (timeRemaining > 0 && timeRemaining <= 60) {
          // Feedback visual suave de urgência nos últimos minutos
          timerDisplay.style.color = '#ff8c00'; // Laranja
        }

        if (timeRemaining <= 0) {
          timeRemaining = 0;
          pauseTimer();
          // Game Over simples, permite continuar, mas com score penalizado
          alert("O tempo acabou! Você continua, mas sua pontuação final será penalizada.");
        }
      }
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isPaused = true;
    pausePlayIcon.className = 'ri-play-fill';
  }

  function togglePausePlay() {
    buttonSound.currentTime = 0;
    buttonSound.play();

    isPaused = !isPaused;
    if (isPaused) {
      pauseTimer();
    } else {
      startTimer();
      pausePlayIcon.className = 'ri-pause-fill';
    }
  }

  function toggleMute() {
    if (isMuted) {
      ambienceSound.play();
      muteIcon.className = 'ri-volume-mute-fill';
    } else {
      ambienceSound.pause();
      ambienceSound.currentTime = 0;
      muteIcon.className = 'ri-volume-up-fill';
    }
    isMuted = !isMuted;
  }

  // 1. Atualiza o display do cronômetro
  updateDisplay();

  // 2. Inicia o cronômetro
  //startTimer();

  // 3. Adiciona Listeners de Evento
  pausePlayButton.addEventListener('click', togglePausePlay);
  muteButton.addEventListener('click', toggleMute);
  codeEntryButton.addEventListener('click', handleCodeEntry);
  penaltyButton.addEventListener('click', handlePenalty);
  hintButton.addEventListener('click', handleHint);
});