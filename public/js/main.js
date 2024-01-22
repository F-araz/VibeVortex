document.addEventListener('DOMContentLoaded', function () {
    // Get the audio player element
    const audioPlayer = document.getElementById('audioPlayer');

    // Get the playlist items
    const playlistItems = document.querySelectorAll('.playlist-item');

    // Add click event listeners to playlist items
    playlistItems.forEach((item, index) => {
        item.addEventListener('click', function () {
            // Set the audio source to the selected song
            const songFile = item.dataset.songFile; // Assuming you have a data attribute for the song file
            audioPlayer.src = songFile;

            // Highlight the selected playlist item
            playlistItems.forEach((item) => {
                item.classList.remove('selected');
            });
            item.classList.add('selected');

            // Play the audio
            audioPlayer.play();
        });
    });

    // Add event listener for play/pause button
    const playPauseButton = document.getElementById('playPauseButton');
    playPauseButton.addEventListener('click', function () {
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    });

    // Add event listener for volume control
    const volumeControl = document.getElementById('volumeControl');
    volumeControl.addEventListener('input', function () {
        audioPlayer.volume = volumeControl.value;
    });

    // Add event listener for seek control
    const seekControl = document.getElementById('seekControl');
    seekControl.addEventListener('input', function () {
        const seekTime = audioPlayer.duration * (seekControl.value / 100);
        audioPlayer.currentTime = seekTime;
    });
});
