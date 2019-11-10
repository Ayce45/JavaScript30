const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');

const toggle = document.querySelector('.toggle');
const skips = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');

toggle.addEventListener('click', handleToggle);
video.addEventListener('click', handleToggle);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
skips.forEach(element => {
    element.addEventListener('click', skip);
});
ranges.forEach(element => {
    element.addEventListener('change', handleRangeUpdate);
    element.addEventListener('mouseover', handleRangeUpdate);
});

progress.addEventListener('click', scrub);
video.addEventListener('timeupdate', handleProgress);
let mousedown = false;
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

function updateButton() {
    if (!video.paused) {
        toggle.innerHTML = '❚❚';
        toggle.title = "Toggle Pause"
    } else {
        toggle.innerHTML = '►';
        toggle.title = "Toggle Play"
    }
}

function handleToggle() {
    if (video.paused) {
        video.play();
        toggle.innerHTML = '❚❚';
        toggle.title = "Toggle Pause"
    } else {
        video.pause();
        toggle.innerHTML = '►';
        toggle.title = "Toggle Play"
    }
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
};

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}