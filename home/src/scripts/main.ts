import { signOut } from "./auth";
import { renderTrendingSong } from "./trendingSong";
import "../styles/tailwind.css";
import "./favoriteAtists";
import { createElementFromHTML, covertTime, formatNumber } from "./utils";
import AudioPlayer, { Track, audioPlayer } from "./AudioPlayer";
import { getListTrack } from "./data";
import { initQueueView } from "./queueView";

document.getElementById("sign-out-btn")!.addEventListener("click", signOut);
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
    id: "ZZB8D39U",
    name: "Childhood Dream",
    url: "https://res.cloudinary.com/dkvga054t/video/upload/v1668262706/mp3/Childhood_dream_-_Seraphine_wjyqxx.mp3",
    artistName: "Seraphine",
    thumbnailUrl: "https://res.cloudinary.com/dkvga054t/image/upload/v1668262394/songImage/serapine_qvdyqb.jpg",
    artistImgUrl: "https://res.cloudinary.com/dkvga054t/image/upload/v1668262394/songImage/serapine_qvdyqb.jpg",
    totalTime: 164000,
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

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});

if (window.location.hash.includes("signin")) {
    window.location.hash = "";
}
// const handleHandleHashChange = () => {
//     const hash = window.location.hash.replace("#", "");
//     switch (hash) {
//         case "signin":
//             document.getElementById("signin")!.classList.remove("hidden");
//             case
// }
import FavoritePage from "./pages/favorivePage";
const favoritePage = new FavoritePage(document.getElementById("other-page")!);
favoritePage.render();
