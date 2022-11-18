import { renderTrendingSong } from "./trendingSong";
import "../styles/tailwind.css";
import "./favoriteAtists";
import { createElementFromHTML, covertTime, formatNumber } from "./utils";
import AudioPlayer, { Track } from "./AudioPlayer";
import { getListTrack } from "./data";
import { initQueueView } from "./queueView";

const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;
if (user) {
    document.getElementById("user-img")!.setAttribute("src", user.avatar);
    document.getElementById("username")!.innerHTML = user.username;
}

const recentlyAddedElement = document.getElementById("recently-added")!;
const handleSongClick = async (songId: string) => {
    const songs = await getListTrack();
    const song = songs.find((song) => song.id == songId);
    if (song) {
        audioPlayer.setTrack(song);
    }
};
let recentSongs: Track[] | null = null;
const renderRecentlyAdded = async (audioPlayer: AudioPlayer | null = null) => {
    recentlyAddedElement.innerHTML = `<div class="flex justify-center items-center"><div class="loader"></div></div>`;

    if (!recentSongs) {
        const url = "https://raw.githubusercontent.com/Mirai3103/nodeWeb1/main/generateData/recentlyAdded.json";
        const response = await (await fetch(url)).json();
        recentSongs = [...response];
    }
    const songs = recentSongs;
    let currentTrackId: string | null = null;
    if (audioPlayer) {
        currentTrackId = audioPlayer.getCurrentTrack().id + "";
    }
    recentlyAddedElement.innerHTML = "";

    for (let i = 0; i < songs.length; i++) {
        const song = songs[i];
        const songElement = createElementFromHTML(`
            <div class="grid grid-cols-10 font-normal text-sm hover:text-[#8338ec] ${
                currentTrackId === song.id ? "bg-slate-50 text-[#8338ec]" : ""
            } hover:bg-slate-50 py-1 cursor-pointer">
                <div class="col-span-1 grid place-content-center ">${
                    currentTrackId === song.id
                        ? `<div class="music-waves -ml-2 -mb-2">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>`
                        : formatNumber(i + 1, 2)
                }</div>
                <div class="col-span-4 flex items-center gap-x-4 px-2">
                    <div
                        class="max-w-[40px] flex justify-center items-center overflow-hidden"
                    >
                        <img
                            class="object-cover rounded-lg flex-shrink-0 min-w-full min-h-full"
                            src="${song.thumbnailUrl}"
                            alt=""
                        />
                    </div>
                    <div class="font-bold text-ellipsis whitespace-nowrap overflow-hidden">${song.name}</div>
                </div>
                <div class="col-span-2 grid place-content-center">${covertTime(song.totalTime)}</div>
                <div class="col-span-3 grid place-content-center text-ellipsis whitespace-nowrap overflow-hidden">${
                    song.artistName
                }</div>
            </div>
        `);
        songElement!.addEventListener("click", () => {
            handleSongClick(song.id + "");
        });
        recentlyAddedElement.appendChild(songElement!);
    }
};

const audioElement = document.getElementById("audio-element") as HTMLAudioElement;
const playBtn = document.getElementById("play-btn") as HTMLButtonElement;
const preSongBtn = document.getElementById("pre-song-btn") as HTMLButtonElement;
const nextSongBtn = document.getElementById("next-song-btn") as HTMLButtonElement;
const playingProcess = document.getElementById("playping-process") as HTMLDivElement;
const processPoint = document.getElementById("process-point") as HTMLDivElement;
const processBar = document.getElementById("process-bar") as HTMLDivElement;
const loopBtn = document.getElementById("loop") as HTMLButtonElement;
const shuffleBtn = document.getElementById("shuffle") as HTMLButtonElement;
const currentPlayImg = document.getElementById("current-play-img") as HTMLImageElement;
const currentSongName = document.getElementById("current-song-name") as HTMLDivElement;
const currentArtistName = document.getElementById("current-artist-name") as HTMLDivElement;
const audioPlayer = new AudioPlayer(audioElement);
const pauseIcon = `<i class="fa-solid fa-pause"></i>`;
const playIcon = `<i class="fa-solid fa-play"></i>`;
const handleTogglePlay = () => {
    if (audioPlayer.isPlaying) {
        audioPlayer.pause();
    } else {
        audioPlayer.play();
    }
};
loopBtn.addEventListener("click", () => {
    if (loopBtn.classList.toggle("text-green-400")) {
        audioPlayer.isRepeat = true;
    } else {
        audioPlayer.isRepeat = false;
    }
});
shuffleBtn.addEventListener("click", () => {
    if (shuffleBtn.classList.toggle("text-green-400")) {
        audioPlayer.isShuffle = true;
    } else {
        audioPlayer.isShuffle = false;
    }
});
audioPlayer.onTrackPause(() => {
    playBtn.innerHTML = playIcon;
    renderTrendingSong(null, audioPlayer);
});
audioPlayer.onTrackStart(() => {
    playBtn.innerHTML = pauseIcon;
    renderRecentlyAdded(audioPlayer);
    renderTrendingSong(null, audioPlayer);
});
playBtn.addEventListener("click", handleTogglePlay);
preSongBtn.addEventListener("click", () => {
    audioPlayer.moveToPrevTrack();
});
nextSongBtn.addEventListener("click", () => {
    audioPlayer.moveToNextTrack();
});
const onProcessBarClick = (e: any) => {
    const MAX_PROCESS_WIDTH = processBar.offsetWidth;
    const percentage = Number(e.offsetX) / Number(MAX_PROCESS_WIDTH);
    const currentTime = Math.floor(Number(audioPlayer.getDuration()) * percentage);
    audioPlayer.setCurrentTime(currentTime);
};
const movePointOnPlaying = (e: any) => {
    const MAX_PROCESS_WIDTH = processBar.offsetWidth;
    const percentage = Number(e.target.currentTime) / Number(e.target.duration);
    playingProcess.style.width = Math.floor(percentage * MAX_PROCESS_WIDTH) + "px";
    processPoint.style.width = Math.floor(percentage * MAX_PROCESS_WIDTH) + "px";
};
const hanldeTimeUpdate = (e: any) => {
    document.getElementById("current-time")!.innerHTML = covertTime(e.target.currentTime * 1000);
};
const onPlay = () => {
    document.getElementById("max-time")!.innerHTML = covertTime(audioPlayer.getCurrentTrack().totalTime);
    currentArtistName.innerHTML = audioPlayer.getCurrentTrack().artistName;
    currentSongName.innerHTML = audioPlayer.getCurrentTrack().name;
    currentPlayImg.src = audioPlayer.getCurrentTrack().thumbnailUrl!;
};
document.getElementById("process-bar-line")?.addEventListener("click", onProcessBarClick);
document.getElementById("playping-process")?.addEventListener("click", onProcessBarClick);
document.getElementById("process-point")?.addEventListener("click", onProcessBarClick);
audioPlayer.onTrackPlaying(movePointOnPlaying);
audioPlayer.onTrackPlaying(hanldeTimeUpdate);
audioPlayer.onTrackStart(onPlay);
audioPlayer.addTrack({
    id: "ZZB8DB9U",
    name: "Way Back Home",
    url: "https://mp3-s1-m-zmp3.zmdcdn.me/313ca1e23ea3d7fd8eb2/8116631274261275645?authen=exp=1668776756~acl=/313ca1e23ea3d7fd8eb2/*~hmac=f81e00f88db4dccc5bab472e09c898c1",
    artistName: "B Ray, Phạm Vi",
    thumbnailUrl:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/c/0/0/3/c00368f9a16eefbedf836821ba6fab36.jpg",
    artistImgUrl:
        "https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/6/5/1/9/651942a9fe205c76b3821246af5d6742.jpg",
    totalTime: 183824,
});

const volumeBar = document.getElementById("volume-bar") as HTMLDivElement;
const volumeBarLine = document.getElementById("volume-bar-line") as HTMLDivElement;
const volumeProcess = document.getElementById("volume-process") as HTMLDivElement;
const volumePoint = document.getElementById("volume-point") as HTMLDivElement;
const onVolumeBarClick = (e: any) => {
    const MAX_PROCESS_WIDTH = volumeBar.offsetWidth;
    const percentage = Number(e.offsetX) / Number(MAX_PROCESS_WIDTH);
    const currentVolume = Number(percentage);
    audioPlayer.setVolume(currentVolume);
    volumeProcess.style.width = Math.floor(percentage * MAX_PROCESS_WIDTH) + "px";
    volumePoint.style.width = Math.floor(percentage * MAX_PROCESS_WIDTH) + "px";
};
volumeBarLine.addEventListener("click", onVolumeBarClick);
volumeProcess.addEventListener("click", onVolumeBarClick);
volumePoint.addEventListener("click", onVolumeBarClick);
renderRecentlyAdded();
renderTrendingSong(null, audioPlayer);
initQueueView(audioPlayer);
