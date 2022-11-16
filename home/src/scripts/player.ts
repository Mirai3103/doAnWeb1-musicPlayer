export const audioPlayer = document.getElementById("music-player") as HTMLAudioElement;
export const handlePlayBtn = document.getElementById("play-btn") as HTMLButtonElement;
export const playingProcess = document.getElementById("playping-process") as HTMLDivElement;
export const processPoint = document.getElementById("process-point") as HTMLDivElement;
export const artistThumbail = document.getElementById("artist-thumbnail") as HTMLImageElement;
export const artistName = document.getElementById("artist-name") as HTMLHeadingElement;
export const songName = document.getElementById("song-name") as HTMLHeadingElement;
const queue = [
    {
        id: 1,
        name: "Waiting for you",
        singer: "Momo",
        audioSrc: "/src/assets/mp3/mono-waitingforyou.mp3",
        imageSrc: "/src/assets/mono.jpg",
    },
];
function onProcessBarClick(e: any) {
    const MAX_PROCESS_WIDTH = 224; // px
    const percentage = Number(e.offsetX) / Number(MAX_PROCESS_WIDTH);
    audioPlayer.currentTime = Math.floor(Number(audioPlayer.duration) * percentage);
}
function onPlaying(e: any) {
    const percentage = Number(e.target.currentTime) / Number(e.target.duration);
    playingProcess.style.width = Math.floor(percentage * 224) + "px";
    processPoint.style.width = Math.floor(percentage * 224) + "px";
}
function onPauseClick(e: any) {
    audioPlayer.pause();
}
function onAudioPause(e: any) {
    handlePlayBtn.removeEventListener("click", onPauseClick);
    handlePlayBtn.addEventListener("click", onPlayBtnClick);

    handlePlayBtn.innerHTML = `<img
                  src="./src/assets/icons/play.svg"
                  alt="play"
                  class="w-8 h-8 text-[#D9D9D9]"
                />`;
}
function onAudioPlay(e: any) {
    handlePlayBtn.removeEventListener("click", onPlayBtnClick);
    handlePlayBtn.addEventListener("click", onPauseClick);
    handlePlayBtn.innerHTML = `<i class="fa-sharp fa fa-solid fa-pause text-[#D9D9D9]"></i>`;
}

function onPlayBtnClick(e: any) {
    audioPlayer.play();
}

audioPlayer.addEventListener("pause", onAudioPause);
audioPlayer.addEventListener("play", onAudioPlay);
document.getElementById("play-btn")?.addEventListener("click", onPlayBtnClick);
document.getElementById("process-bar-line")?.addEventListener("click", onProcessBarClick);
document.getElementById("playping-process")?.addEventListener("click", onProcessBarClick);
document.getElementById("process-point")?.addEventListener("click", onProcessBarClick);
audioPlayer.addEventListener("timeupdate", onPlaying);

let index = 0;

function changeSong(index: number) {
    const isPlaying = !audioPlayer.paused;
    audioPlayer.getElementsByTagName("source")[0].src = queue[index].audioSrc;
    audioPlayer.load();
    artistThumbail.src = queue[index].imageSrc;
    artistName.innerText = queue[index].singer;
    songName.innerText = queue[index].name;
    if (isPlaying) {
        audioPlayer.play();
    }
}
changeSong(0);
const moveToNextSongBtn = document.getElementById("next-song-btn");
const moveToPreSongBtn = document.getElementById("pre-song-btn");
function onMoveToNextSong(e: any) {
    index++;
    changeSong(index);
    if (index == queue.length - 1) {
        moveToNextSongBtn?.removeEventListener("click", onMoveToNextSong);
    }
}
function onMoveToPreSong(e: any) {
    index--;
    changeSong(index);
    if (index == 0) {
        moveToPreSongBtn?.removeEventListener("click", onMoveToPreSong);
    }
}

moveToPreSongBtn?.addEventListener("click", onMoveToPreSong);
moveToNextSongBtn?.addEventListener("click", onMoveToNextSong);
