// ОТКРЫТИЕ/ЗАКРЫТИЕ НАВИГАЦИОННОЙ ПАНЕЛИ
function openNav() {          
    document.getElementById("sideNav").style.width = "250px";          
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("sideNav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

// ПЕРЕКЛЮЧАТЕЛЬ МЕЖДУ ТЕМАМИ
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

// ОТКРЫТИЕ МОДАЛЬНОГО ОКНА
function openModal(trackSrc, coverSrc, trackTitle, artist) {
    const modal = $('#trackModal');
    const modalAudio = document.getElementById('modalAudio');
    const playerAudio = document.getElementById('playerAudio');
    
    // Синхронизируем модальное окно с аудиоплеером
    modalAudio.src = trackSrc;
    modalAudio.currentTime = playerAudio.currentTime;
    if (!playerAudio.paused) {
        modalAudio.play();
    }
    
    $('#modalTrackCover').attr('src', coverSrc);
    $('#trackModalLabel').text(`${trackTitle} - ${artist}`);

    const theme = document.body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
    modal.find('.modal-content').attr('class', `modal-content ${theme}`);

    modal.modal('show');
    playerAudio.pause();
}

// ОТКРЫТИЕ ПЛЕЕРА
function openPlayer(audioSrc, coverSrc, title, artist) {
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

// ЗАКРЫТИЕ ПЛЕЕРА
function closePlayer() {
    const playerAudio = document.getElementById('playerAudio');
    const fixedPlayer = document.getElementById('fixedPlayer');

    if (playerAudio && fixedPlayer) {
        fixedPlayer.classList.remove('show');
        playerAudio.pause();
    }
}

// ОТКРЫТИЕ МОДАЛЬНОГО ОКНА ПРИ НАЖАТИИ НА ФИКСИРОВАННЫЙ ПЛЕЕР В МОБИЛЬНОЙ ВЕРСИИ
document.getElementById('fixedPlayer').addEventListener('click', function(event) {
    const fixedPlayer = document.getElementById('fixedPlayer');
    if (window.innerWidth <= 768 && fixedPlayer.classList.contains('show')) {
        const playerAudioSrc = document.getElementById('playerAudioSource').src;
        const playerTrackCoverSrc = document.getElementById('playerTrackCover').src;
        const playerTrackTitle = document.getElementById('playerTrackTitle').textContent;
        const playerTrackArtist = document.getElementById('playerTrackArtist').textContent;
        openModal(playerAudioSrc, playerTrackCoverSrc, playerTrackTitle, playerTrackArtist);
        event.stopPropagation();  // Останавливаем дальнейшую обработку события
    }
});

// Закрытие модального окна
$('#trackModal').on('hidden.bs.modal', function () {
    const playerAudio = document.getElementById('playerAudio');
    const modalAudio = document.getElementById('modalAudio');
    const fixedPlayer = document.getElementById('fixedPlayer');
    
    // Синхронизируем плеер с модальным окном
    playerAudio.currentTime = modalAudio.currentTime;
    if (!modalAudio.paused) {
        playerAudio.play();
    }
    fixedPlayer.classList.add('show');
});

// Замена скелетона реальным контентом после загрузки
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const trackList = document.getElementById('trackList');
        trackList.innerHTML = `
            <div class="audio-track" onclick="openPlayer('src/audios/Metallica_Nothing_Else_Matters.mp3', 'src/photos/Metallica_Nothing_Else_Matters.jpeg', 'Nothing Else Matters', 'Metallica')">
                <div class="track-info">
                    <img src="src/photos/Metallica_Nothing_Else_Matters.jpeg" alt="Track 1 Cover" class="track-cover">
                    <div class="track-details">
                        <h4>Nothing Else Matters</h4>
                        <p>Metallica</p>
                    </div>
                </div>
            </div>
            <div class="audio-track" onclick="openPlayer('src/audios/Metallica_fadeToBlack.mp3', 'src/photos/Metallica_fadeToBlack.jpg', 'Fade To Black', 'Metallica')">
                <div class="track-info">
                    <img src="src/photos/Metallica_fadeToBlack.jpg" alt="Track 2 Cover" class="track-cover">
                    <div class="track-details">
                        <h4>Fade to Black</h4>
                        <p>Metallica</p>
                    </div>
                </div>
            </div>
            <!-- другие треки сюда -->
        `;
    }, 1000); // Имитация задержки загрузки
});
