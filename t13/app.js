// Dark Mode 
const themeSwitch = document.getElementById('switch');
const body = document.body;
const currentTheme = localStorage.getItem('theme') || 'light';

body.setAttribute('data-theme', currentTheme);
if (currentTheme === 'dark') themeSwitch.checked = true;

themeSwitch.addEventListener('change', function () {
    const theme = this.checked ? 'dark' : 'light';
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});

// Audio Player Functionality
const audio = document.getElementById('audioElement');
const playBtn = document.getElementById('playBtn');
const progressBar = document.getElementById('progress');
const progressContainer = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volumeSlider');
const volumeValue = document.getElementById('volumeValue');
const volumeIcon = document.getElementById('volumeIcon');

audio.volume = 0.5;

// audio duration
audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
});

// Play/Pause
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

// Update progress
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + '%';
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

// Seek functionality
progressContainer.addEventListener('click', (e) => {
    audio.currentTime = (e.offsetX / progressContainer.clientWidth) * audio.duration;
});

// Volume control
volumeSlider.addEventListener('input', function () {
    const volume = this.value / 100;
    audio.volume = volume;
    volumeValue.textContent = this.value + '%';

    if (volume === 0) {
        volumeIcon.className = 'fas fa-volume-mute volume-icon';
    } else if (volume < 0.5) {
        volumeIcon.className = 'fas fa-volume-down volume-icon';
    } else {
        volumeIcon.className = 'fas fa-volume-up volume-icon';
    }
});

// mute
volumeIcon.addEventListener('click', () => {
    if (audio.volume > 0) {
        audio.volume = 0;
        volumeSlider.value = 0;
        volumeValue.textContent = '0%';
        volumeIcon.className = 'fas fa-volume-mute volume-icon';
    } else {
        audio.volume = 0.5;
        volumeSlider.value = 50;
        volumeValue.textContent = '50%';
        volumeIcon.className = 'fas fa-volume-up volume-icon';
    }
});

// skip button
document.getElementById('prevBtn').addEventListener('click', () => {
    audio.currentTime = Math.max(0, audio.currentTime - 10);
});

document.getElementById('nextBtn').addEventListener('click', () => {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
});

// time
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Navbar scroll 
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.style.background = window.scrollY > 100 ?
        'rgba(255, 255, 255, 0.95)' :
        'rgba(255, 255, 255, 0.1)';
});
