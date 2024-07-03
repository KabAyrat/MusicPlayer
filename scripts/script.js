function openNav() {  //    ОТКРЫТИЕ/ЗАКРЫТИЕ НАВИГАЦИОННОЙ ПАНЕЛИ
    document.getElementById("sideNav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("sideNav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

document.getElementById("themeSwitch").addEventListener("change", function() {      //ПЕРЕКЛЮЧАТЕЛЬ МЕЖДУ ТЕМАМИ
    const body = document.body;
    if (this.checked) {
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
    } else {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
    }
});
function openModal(trackSrc, coverSrc, trackTitle, artist) { // ОТКРТЫИЕ МОДАЛЬНОГО ОКНА
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