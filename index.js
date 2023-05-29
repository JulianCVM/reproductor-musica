const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'Water',
        cover: 'assets/1.png',
        artist: 'Caleb Belkin',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'in luv',
        cover: 'assets/2.gif',
        artist: 'AMBITION',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'ＳＵＮＤＡＹ ＳＣＨＯＯＬ',
        cover: 'assets/3.gif',
        artist: 'Yung Logos',
    },
    {
        path: 'assets/4.mp3',
        displayName: 'Letting Go',
        cover: 'assets/4.jpg',
        artist: 'greafer',

    },
	{
        path: 'assets/5.mp3',
        displayName: 'the eye of truth',
        cover: 'assets/5.gif',
        artist: 'driver',

    },
	{
        path: 'assets/6.m4a',
        displayName: 'for her.',
        cover: 'assets/6.gif',
        artist: 'Caleb Belkin',

    },
	{
        path: 'assets/7.m4a',
        displayName: 'if only',
        cover: 'assets/7.gif',
        artist: 'if only',

    },
	{
        path: 'assets/8.m4a',
        displayName: 'feelings[extended]',
        cover: 'assets/8.gif',
        artist: 'SkyHigh',

    },
	{
        path: 'assets/9.m4a',
        displayName: 'BesideZion',
        cover: 'assets/9.gif',
        artist: 'BesideZion',

    },
	{
        path: 'assets/10.m4a',
        displayName: 'THIN ICE',
        cover: 'assets/10.gif',
        artist: 'krstphr',

    },
	{
        path: 'assets/11.m4a',
        displayName: 'depression',
        cover: 'assets/11.gif',
        artist: 'otxhello',

    },
	{
        path: 'assets/12.m4a',
        displayName: 'Time Will Tell',
        cover: 'assets/12.gif',
        artist: 'Idealism',

    },
	{
        path: 'assets/13.m4a',
        displayName: 'I miss you',
        cover: 'assets/13.gif',
        artist: 'Elijah who',

    },
	{
        path: 'assets/14.m4a',
        displayName: 'リサフランク420 / 現代のコンピュー |(reupload)',
        cover: 'assets/14.gif',
        artist: 'MACINTOSH PLUS',

    },
	{
        path: 'assets/15.m4a',
        displayName: '迷いの森 // S a r i a',
        cover: 'assets/15.gif',
        artist: 'Polygon Dream',

    },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);
// ...código existente...

const volumeSlider = document.getElementById('volume-slider');

volumeSlider.addEventListener('input', function() {
  const volume = parseFloat(this.value);
  music.volume = volume;
});

loadMusic(songs[musicIndex]);
