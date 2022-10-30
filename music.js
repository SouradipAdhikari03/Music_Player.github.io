const music = document.querySelector('audio')
const img = document.querySelector('img')
const play = document.getElementById("play")
const title = document.getElementById("title")
const artist = document.getElementById("artist")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
let progress = document.getElementById('progress');
const total_duration = document.getElementById("duration")
let current_time = document.getElementById("current_time");
const progress_div = document.getElementById("progress_div");
const repeat =document.getElementById("repeat");
const shuffle=document.getElementById("shuffle")


let isPlaying = false;
const PauseMusic = () => {
    isPlaying = false;
    music.pause();
    play.classList.replace('fa-circle-pause', 'fa-circle-play')
    img.classList.remove("rotation");

}
const PlayMusic = () => {
    isPlaying = true;
    music.play();
    play.classList.replace('fa-circle-play', 'fa-circle-pause')
    img.classList.add("rotation");

}
play.addEventListener('click', () => {
    isPlaying ? PauseMusic() : PlayMusic();
})

const songs = [
    {
        name: "Track-1",
        title: "Meri Bheegi Bheegi Si",
        artist: "R. D. Burman"
    },
    {
        name: "Track-2",
        title: "Khuda Jaane",
        artist: "KK, Shilpa Rao"
    },
    {
        name: "Track-3",
        title: "Ajab Si",
        artist: "KK"
    },
    {
        name: "Track-4",
        title: "ভালবাসার মরশুম",
        artist: "Shreya Ghosal"
    },
    {
        name: "Track-5",
        title: "বায়নাবিলাসী",
        artist: "Sahana Bajpaie, Samantak Sinha"
    },
    {
        name: "Track-6",
        title: "Dhaaga(TVF)",
        artist: "Nilotpal Bora"
    },
    {
        name: "Track-7",
        title: "Ya Ali",
        artist: "Zubeen , Emraan Hashmi"
    },
    {
        name: "Track-8",
        title: "একটা ছেলে",
        artist: "Sahana Bajpaie"
    },
    {
        name: "Track-9",
        title: "ভিনদেশী তারা",
        artist: "Anindya Chatterjee"
    },
    {
        name: "Track-10",
        title: "অভাবে কেন",
        artist: "Anupam Roy"
    }
];

const loadSong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = "music/" + songs.name + ".mp3";
    img.src = "images/" + songs.name + ".jpg";
};

songIndex = 0;
const nextSong = ('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    PlayMusic();
})
const prevSong = ('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    PlayMusic();
})

repeat.addEventListener("click",()=>{

    const time=0;

    music.currentTime=time;

})

shuffle.addEventListener("click",()=>{

    songIndex=Math.floor(Math.random() * 10);

    loadSong(songs[songIndex]);

    PlayMusic();

})

// Progress bar work
music.addEventListener('timeupdate', (event) => {
    const { currentTime, duration } = event.target;
    let progress_time = (currentTime / duration) * 100;
    progress.style.width = `${progress_time}%`
    // duration update
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);
    if (sec_duration < 10) {
        sec_duration = `0${sec_duration}`
    }

    let tot_duration = `${min_duration}:${sec_duration}`;
    if (duration)
        total_duration.textContent = `${tot_duration}`
    // running duration update
    let min_runningduration = Math.floor(currentTime / 60);
    let sec_runningduration = Math.floor(currentTime % 60);
    if (sec_runningduration < 10) {
        sec_runningduration = `0${sec_runningduration}`
    }
    let tot_runningduration = `${min_runningduration}:${sec_runningduration}`;
    if (currentTime)
        current_time.textContent = `${tot_runningduration}`
});

// resume on dynamic click

progress_div.addEventListener("click", (event) => {

    const{duration}=music;

    let mov_progress= (event.offsetX/event.target.clientWidth)*duration;
    music.currentTime=mov_progress;
})

next.addEventListener("click", nextSong)
prev.addEventListener("click", prevSong)
music.addEventListener("ended", nextSong);
