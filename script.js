let songsIndex = 0;
let audioElement = new Audio(); // Initialize the audio object
audioElement.src = `songs/${songsIndex + 1}.mp3`; // Load the first song dynamically

const masterplay = document.getElementById("masterplay");
const songBar = document.getElementById("songBar");
const nextBtn = document.querySelector(".fa-forward");
const prevBtn = document.querySelector(".fa-backward");
const songItemPlays = document.querySelectorAll(".fa-solid.fa-play"); // Select all song play icons

const songs = [
    { songName: "Let me love you", filepath: "songs/1.mp3", coverpath: "covers/1.jpg" },
    { songName: "Hold my hand", filepath: "songs/2.mp3", coverpath: "covers/2.jpg" },
    { songName: "Country road", filepath: "songs/3.mp3", coverpath: "covers/3.jpg" },
    { songName: "Summer", filepath: "songs/4.mp3", coverpath: "covers/4.jpg" },
    { songName: "Summer Remix", filepath: "songs/5.mp3", coverpath: "covers/5.jpg" },
];

// Play or pause the audio
function togglePlayPause() {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play(); // Play the audio
        masterplay.classList.remove("fa-play"); // Change the play icon to pause
        masterplay.classList.add("fa-pause");
    } else {
        audioElement.pause(); // Pause the audio
        masterplay.classList.remove("fa-pause"); // Change the pause icon back to play
        masterplay.classList.add("fa-play");
    }
}

// Play the next song
function playNextSong() {
    songsIndex = (songsIndex + 1) % songs.length; // Go to the next song (loop back to the start)
    playCurrentSong();
}

// Play the previous song
function playPrevSong() {
    songsIndex = (songsIndex - 1 + songs.length) % songs.length; // Go to the previous song (loop back to the end)
    playCurrentSong();
}

// Play the selected song
function playCurrentSong() {
    audioElement.src = songs[songsIndex].filepath; // Update the audio source
    audioElement.play(); // Play the selected song
    masterplay.classList.remove("fa-play"); // Update master play button to pause
    masterplay.classList.add("fa-pause");
    updateSongIcons(); // Update all song play icons
}

// Reset all play icons to the default state
function resetPlayIcons() {
    songItemPlays.forEach((icon) => {
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
    });
}

// Update the clicked song icon to "pause"
function updateSongIcons() {
    resetPlayIcons();
    const activeIcon = songItemPlays[songsIndex]; // Get the icon of the current song
    activeIcon.classList.remove("fa-play");
    activeIcon.classList.add("fa-pause");
}

// Add click event listeners to all song icons
songItemPlays.forEach((icon, index) => {
    icon.addEventListener("click", () => {
        if (songsIndex === index && !audioElement.paused) {
            // If the same song is clicked and it's playing, pause it
            audioElement.pause();
            masterplay.classList.remove("fa-pause");
            masterplay.classList.add("fa-play");
            icon.classList.remove("fa-pause");
            icon.classList.add("fa-play");
        } else {
            // Play the selected song
            songsIndex = index;
            playCurrentSong();
        }
    });
});

// Update the progress bar as the song plays
audioElement.addEventListener("timeupdate", () => {
    const progress = (audioElement.currentTime / audioElement.duration) * 100; // Calculate progress
    songBar.value = progress || 0; // Update the song bar
});

// Seek the song when the user interacts with the song bar
songBar.addEventListener("input", () => {
    audioElement.currentTime = (songBar.value / 100) * audioElement.duration; // Update current time
});

// Event listener for play/pause button
masterplay.addEventListener("click", togglePlayPause);

// Event listeners for next and previous buttons
nextBtn.addEventListener("click", playNextSong);
prevBtn.addEventListener("click", playPrevSong);

// Automatically play the next song when the current song ends
audioElement.addEventListener("ended", playNextSong);
