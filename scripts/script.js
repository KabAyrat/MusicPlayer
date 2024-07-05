function openNav() {            // ОТКРЫТИЕ/ЗАКРЫТИЕ НАВИГАЦИОННОЙ ПАНЕЛИ
    document.getElementById("sideNav").style.width = "250px";          
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("sideNav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

document.getElementById("themeSwitch").addEventListener("change", function() {      // ПЕРЕКЛЮЧАТЕЛЬ МЕЖДУ ТЕМАМИ
    const body = document.body;
    if (this.checked) {
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
    } else {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
    }
});
function openModal(trackSrc, coverSrc, trackTitle, artist) {        // ОТКРЫТИЕ МОДАЛЬНОГО ОКНА
    const modal = $('#trackModal');
    const audio = document.getElementById('modalAudio');

    audio.pause();
    audio.currentTime = 0;

    $('#modalAudio').attr('src', trackSrc);
    $('#modalTrackCover').attr('src', coverSrc);
    $('#trackModalLabel').text(`${trackTitle} - ${artist}`);

    const theme = document.body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
    modal.find('.modal-content').attr('class', `modal-content ${theme}`);

    modal.modal('show');
}
function openPlayer(audioSrc, coverSrc, title, artist) {        // ОТКРЫТИЕ ПЛЕЕРА
    const playerAudio = document.getElementById('playerAudio');
    const playerAudioSource = document.getElementById('playerAudioSource');
    const playerTrackCover = document.getElementById('playerTrackCover');
    const playerTrackTitle = document.getElementById('playerTrackTitle');
    const playerTrackArtist = document.getElementById('playerTrackArtist');
    const fixedPlayer = document.getElementById('fixedPlayer');

    if (playerAudio && playerAudioSource && playerTrackCover && playerTrackTitle && playerTrackArtist && fixedPlayer) {
        playerAudioSource.src = audioSrc;
        playerTrackCover.src = coverSrc;
        playerTrackTitle.textContent = title;
        playerTrackArtist.textContent = artist;
        playerAudio.load();
        fixedPlayer.classList.add('show');
        playerAudio.play();
    }
}

function closePlayer() {    // ЗАКРЫТИЕ ПЛЕЕРА
    const playerAudio = document.getElementById('playerAudio');
    const fixedPlayer = document.getElementById('fixedPlayer');

    if (playerAudio && fixedPlayer) {
        fixedPlayer.classList.remove('show');
        playerAudio.pause();
    }
}

document.getElementById('fixedPlayer').addEventListener('click', function() {       // ОТКРЫТИЕ МОДАЛЬНОГО ОКНА
    if (window.innerWidth <= 768) {
        const playerAudioSrc = document.getElementById('playerAudioSource').src;
        const playerTrackCoverSrc = document.getElementById('playerTrackCover').src;
        const playerTrackTitle = document.getElementById('playerTrackTitle').textContent;
        const playerTrackArtist = document.getElementById('playerTrackArtist').textContent;
        openModal(playerAudioSrc, playerTrackCoverSrc, playerTrackTitle, playerTrackArtist);
    }
});