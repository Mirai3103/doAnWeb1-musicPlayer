import { getTrackById } from "./data";
import { createElementFromHTML, handleSongClick } from "./utils";
import AudioPlayer, { audioPlayer } from "./AudioPlayer";
import { renctlyPlayed } from "./auth";

let isShow = false;
const queueViewElement = document.getElementById("queue-view");
export const toggleQueueView = () => {
    if (isShow) {
        queueViewElement!.classList.add("w-0");
        queueViewElement!.classList.remove("w-queue");

        isShow = false;
    } else {
        queueViewElement!.classList.add("w-queue");
        queueViewElement!.classList.remove("w-0");
        isShow = true;
    }
};
const renderQueueView = (audioPlayer: AudioPlayer) => {
    const nowPlayingContainer = document.getElementById("now-playing-container")!;
    const nextSongsContainer = document.getElementById("next-song-container")!;
    nowPlayingContainer.innerHTML = "";
    nextSongsContainer.innerHTML = "";
    const remainingTracks = audioPlayer.getRemainingTracks();
    const nowPlayingTrack = audioPlayer.getCurrentTrack();
    const nowPlayingElement =
        createElementFromHTML(` <div class="grid grid-cols-8 text-[#8338ec] bg-slate-300 p-2 rounded-sm">
                            <div class="col-span-6 flex items-center gap-x-4">
                                <div
                                    class="min-w-[40px] max-w-[40px] h-full flex justify-center items-center overflow-hidden relative"
                                >
                                    <div
                                        class="absolute z-10 top-0 left-0 w-full h-full text-white flex bg-black bg-opacity-30 rounded-md"
                                    >
                                        <div class="music-waves mb-2 ml-1">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                    <img
                                        class="h-full object-cover rounded-lg flex-shrink-0 w-full"
                                        src="${nowPlayingTrack.thumbnailUrl}"
                                        alt="${nowPlayingTrack.name}"
                                    />
                                </div>
                                <div class="font-bold text-ellipsis whitespace-nowrap overflow-hidden flex flex-col">
                                    <span>${nowPlayingTrack.name}</span>
                                    <span class="text-xs font-light">${nowPlayingTrack.artistName}</span>
                                </div>
                            </div>
                            <div class="col-span-1 grid place-content-center">
                                <i class="fa-regular fa-heart"></i>
                            </div>
                            <div class="col-span-1 grid place-content-center">
                                <span class="font-bold text-3xl">...</span>
                            </div>
                        </div>
                        `);
    nowPlayingContainer.appendChild(nowPlayingElement!);
    for (let i = 0; i < remainingTracks.length; i++) {
        const track = remainingTracks[i];
        const nextSongElement =
            createElementFromHTML(` <div class="grid grid-cols-8 group hover:text-[#8338ec] hover:bg-slate-300 p-2 rounded-sm border-b">
                            <div class="col-span-6 flex items-center gap-x-4">
                                <div
                                    class="min-w-[40px] max-w-[40px] h-full flex cursor-pointer play-song-btn justify-center items-center overflow-hidden relative"
                                >
                                    <div
                                        class="absolute hidden z-10 top-0 left-0 w-full h-full text-white bg-black bg-opacity-30 rounded-md group-hover:flex justify-center items-center"
                                    >
                                        <i class="fa-solid fa-play"></i>
                                    </div>
                                    <img
                                        class="h-full object-cover rounded-lg flex-shrink-0 w-full"
                                        src="${track.thumbnailUrl}"
                                        alt="${track.name}"
                                    />
                                </div>
                                <div class="font-bold text-ellipsis whitespace-nowrap overflow-hidden flex flex-col">
                                    <span class="text-sm">${track.name}</span>
                                    <span class="text-xs font-light">${track.artistName}</span>
                                </div>
                            </div>
                            <div class="col-span-1 grid place-content-center">
                                <i class="fa-regular fa-heart"></i>
                            </div>
                            <div class="col-span-1 grid place-content-center">
                                <span class="font-bold text-3xl">...</span>
                            </div>
                        </div>`);
        (nextSongElement as HTMLElement).querySelector(".play-song-btn")!.addEventListener("click", (e) => {
            const index = audioPlayer.getIndexOfTrack(track.id);
            if (index == -1) {
                handleSongClick(track.id + "");
            }
            audioPlayer.setIndex(index);
            audioPlayer.reloadSource();
            audioPlayer.play();
        });
        nextSongsContainer.appendChild(nextSongElement!);
    }
};
let queueViewState = "queue";
export const initQueueView = (audioPlayer: AudioPlayer) => {
    document.getElementById("toggle-queue-btn")!.addEventListener("click", () => {
        toggleQueueView();
    });

    renderView(audioPlayer);

    const queueBtn = document.getElementById("queue-btn");
    const recentlyBtn = document.getElementById("recently-btn");
    queueBtn?.addEventListener("click", () => {
        if (queueViewState == "queue") {
            return;
        }
        queueViewState = "queue";
        queueBtn.classList.add("active");
        recentlyBtn?.classList.remove("active");
        renderView(audioPlayer);
    });
    recentlyBtn?.addEventListener("click", () => {
        console.log("click 2", queueViewState);

        if (queueViewState == "recently") {
            return;
        }
        queueViewState = "recently";
        recentlyBtn.classList.add("active");
        queueBtn?.classList.remove("active");
        renderView(audioPlayer);
    });

    audioPlayer.onTrackStart(() => {
        renderView(audioPlayer);
    });
    audioPlayer.addOnQueueChange(() => {
        renderView(audioPlayer);
    });
};

const renderRecently = async () => {
    const container = document.getElementById("recently-container")!;
    for (let i = 0; i < renctlyPlayed.length; i++) {
        const track = (await getTrackById(renctlyPlayed[i]))!;
        const nextSongElement =
            createElementFromHTML(` <div class="grid grid-cols-8 group hover:text-[#8338ec] hover:bg-slate-300 p-2 rounded-sm border-b">
                            <div class="col-span-6 flex items-center gap-x-4">
                                <div
                                    class="min-w-[40px] max-w-[40px] h-full flex cursor-pointer play-song-btn justify-center items-center overflow-hidden relative"
                                >
                                    <div
                                        class="absolute hidden z-10 top-0 left-0 w-full h-full text-white bg-black bg-opacity-30 rounded-md group-hover:flex justify-center items-center"
                                    >
                                        <i class="fa-solid fa-play"></i>
                                    </div>
                                    <img
                                        class="h-full object-cover rounded-lg flex-shrink-0 w-full"
                                        src="${track.thumbnailUrl}"
                                        alt="${track.name}"
                                    />
                                </div>
                                <div class="font-bold text-ellipsis whitespace-nowrap overflow-hidden flex flex-col">
                                    <span class="text-sm">${track.name}</span>
                                    <span class="text-xs font-light">${track.artistName}</span>
                                </div>
                            </div>
                            <div class="col-span-1 grid place-content-center">
                                <i class="fa-regular fa-heart"></i>
                            </div>
                            <div class="col-span-1 grid place-content-center">
                                <span class="font-bold text-3xl">...</span>
                            </div>
                        </div>`);
        (nextSongElement as HTMLElement).querySelector(".play-song-btn")!.addEventListener("click", (e) => {
            const index = audioPlayer.getIndexOfTrack(track.id);
            if (index == -1) {
                handleSongClick(track.id + "");
            }
            audioPlayer.setIndex(index);
            audioPlayer.reloadSource();
            audioPlayer.play();
        });
        container.appendChild(nextSongElement!);
    }
};

const renderView = (audioPlayer: AudioPlayer) => {
    if (queueViewState == "queue") {
        document.getElementById(
            "queueViewContainer"
        )!.innerHTML = `<div class="font-semibold text-lg text-[#8338ec]">Now playing</div>
                    <div id="now-playing-container" class="pl-2 py-2"></div>
                    <div class="font-semibold text-lg text-[#8338ec]">Next from queue</div>
                    <div id="next-song-container" class="pl-2 py-2"></div>`;
        renderQueueView(audioPlayer);
    } else {
        document.getElementById(
            "queueViewContainer"
        )!.innerHTML = `<div class="font-semibold text-lg text-[#8338ec]">Recently</div>
                    <div id="recently-container" class="pl-2 py-2"></div>`;
        renderRecently();
    }
};
