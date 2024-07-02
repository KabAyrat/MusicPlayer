// Open and close the side navigation
function openNav() {
    document.getElementById("sideNav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("sideNav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

// Toggle between light and dark theme
document.getElementById("themeSwitch").addEventListener("change", function() {
    const body = document.body;
    if (this.checked) {
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
    } else {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
    }
});
// Toggle play/pause for audio
function togglePlayPause(audioId, button) {
    const audio = document.getElementById(audioId);
    if (audio.paused) {
        audio.play();
        button.textContent = 'Pause';
    } else {
        audio.pause();
        button.textContent = 'Play';
    }
}

function updateSeekBar(audioId, seekBar) {
    const audio = document.getElementById(audioId);
    seekBar.value = (audio.currentTime / audio.duration) * 100;
}

function seekAudio(audioId, seekBar) {
    const audio = document.getElementById(audioId);
    const seekTo = (seekBar.value / 100) * audio.duration;
    audio.currentTime = seekTo;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function updateTimeDisplay(audioId, currentTimeDisplay, totalTimeDisplay) {
    const audio = document.getElementById(audioId);
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
    totalTimeDisplay.textContent = formatTime(audio.duration);
}

function addAudioEventListeners(audioId, seekBar, currentTimeDisplay, totalTimeDisplay) {
    const audio = document.getElementById(audioId);
    audio.addEventListener('timeupdate', () => {
        updateSeekBar(audioId, seekBar);
        updateTimeDisplay(audioId, currentTimeDisplay, totalTimeDisplay);
    });
    audio.addEventListener('loadedmetadata', () => {
        totalTimeDisplay.textContent = formatTime(audio.duration);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    addAudioEventListeners('audio1', document.querySelector('.seek-bar'), document.querySelector('.current-time'), document.querySelector('.total-time'));
});
// Toggle play/pause for audio
function togglePlayPause(audioId, button) {
    const audio = document.getElementById(audioId);
    if (audio.paused) {
        audio.play();
        button.classList.add('playing');
    } else {
        audio.pause();
        button.classList.remove('playing');
    }
}