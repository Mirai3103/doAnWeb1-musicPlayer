import { openContextMenu } from "./songContextMenu";
import AudioPlayer, { Track } from "./AudioPlayer";
import { getListTrack } from "./data";
import { createElementFromHTML, formatNumber, covertTime } from "./utils";
let currentTimeState = "today";
let audioPlayerOld: AudioPlayer | null = null;
const trendingTodayTab = document.getElementById("trending-today-tab")!;
const trendingWeekTab = document.getElementById("trending-week-tab")!;
const trendingMonthTab = document.getElementById("trending-month-tab")!;
import { isFavorite, toggleFavorite } from "./auth";
const handleSongClick = async (songId: string, audioPlayer: AudioPlayer) => {
    if (songId === audioPlayer.getCurrentTrack().id + "") {
        audioPlayer.togglePlay();
        return;
    }

    const songs = await getListTrack();
    const song = songs.find((song) => song.id == songId);
    if (song) {
        audioPlayer.setTrack(song);
    }
};
interface ICached {
    [key: string]: Track[];
}
let cachedTrending: ICached = {
    today: [],
    week: [],
    month: [],
};
const renderTrendingSong = async (time: string | null = null, audioPlayer: AudioPlayer | null = null) => {
    const trendingSongContainer = document.querySelector("#trendingsong");
    if (audioPlayer) {
        audioPlayerOld = audioPlayer;
    } else {
        audioPlayer = audioPlayerOld;
    }
    trendingSongContainer!.innerHTML = `<div class="flex justify-center items-center"><div class="loader"></div></div>`;
    if (time) {
        currentTimeState = time;
    } else {
        time = currentTimeState;
    }
    let url = "";
    switch (time) {
        case "today":
            url = "https://raw.githubusercontent.com/Mirai3103/nodeWeb1/main/generateData/tredingday.json";
            break;
        case "week":
            url = "https://raw.githubusercontent.com/Mirai3103/nodeWeb1/main/generateData/tredingWeek.json";
            break;
        case "month":
            url = "https://raw.githubusercontent.com/Mirai3103/nodeWeb1/main/generateData/tredingMonth.json";
            break;
        default:
            return;
    }
    const songs: Track[] =
        cachedTrending[time].length > 0 ? [...cachedTrending[time]] : await (await fetch(url)).json();
    console.log("ok");

    trendingSongContainer!.innerHTML = "";
    let currentTrackId: string | null = null;
    if (audioPlayer) {
        currentTrackId = audioPlayer.getCurrentTrack().id + "";
    }
    songs.forEach((song, index) => {
        const isFavoriteSong = isFavorite(song.id + "");
        const htmlString = `<div songId="${song.id}" class="grid grid-cols-8 font-normal text-sm hover:text-[#8338ec] ${
            currentTrackId === song.id ? "bg-slate-50 text-[#8338ec]" : ""
        } hover:bg-slate-50 py-1 cursor-pointer"
                                        >
                                            <div class="col-span-1 grid place-content-center ">${
                                                currentTrackId === song.id
                                                    ? `<div class="music-waves -ml-2 -mb-2">
                                                            <span></span>
                                                            <span></span>
                                                            <span></span>
                                                            <span></span>
                                                            <span></span>
                                                        </div>`
                                                    : formatNumber(index + 1, 2)
                                            }</div>
                                            <abbr title="${
                                                song.name
                                            }" class="col-span-3 flex items-center gap-x-4 px-2 play-song-btn">
                                                <div
                                                    class="min-w-[40px] max-w-[40px] h-full flex justify-center items-center overflow-hidden"
                                                >
                                                    <img
                                                        class="h-full object-cover rounded-lg flex-shrink-0 w-full"
                                                        src="${song.thumbnailUrl}"
                                                        alt="${song.name}"
                                                    />
                                                </div>
                                                <div
                                                    class="font-bold text-ellipsis whitespace-nowrap overflow-hidden flex flex-col"
                                                >
                                                    <span>${song.name}</span>
                                                    <span class="text-xs font-light">${song.artistName}</span>
                                                </div>
                                            </abbr>
                                            <div class="col-span-1 grid place-content-center">${covertTime(
                                                song.totalTime
                                            )}</div>
                                            <div class="col-span-1 grid place-content-center ">
                                                <i class="fa-solid ${
                                                    currentTrackId === song.id && audioPlayer?.isPlaying
                                                        ? "fa-pause"
                                                        : "fa-play"
                                                }"></i>
                                            </div>
                                            <abbr title="Add to your favorite" class="add-favorite-btn col-span-1 grid place-content-center hover:text-red-500">
                                               ${
                                                   isFavoriteSong
                                                       ? `<i class="fa-solid fa-heart"></i>`
                                                       : `<i class="fa-regular fa-heart"></i>`
                                               }
                                            </abbr>
                                            <div class="col-span-1 grid place-content-center">
                                               <a href="${
                                                   song.url
                                               }" download target="_blank"> <i class="fa-solid fa-download"></i></a>
                                            </div>
                                        </div>
                                        `;
        const element = createElementFromHTML(htmlString)!;

        (element as HTMLElement).querySelector(".play-song-btn")!.addEventListener("click", (e) => {
            handleSongClick(song.id + "", audioPlayer as AudioPlayer);
        });
        (element as HTMLElement).querySelector(".add-favorite-btn")!.addEventListener("click", (e) => {
            toggleFavorite(song.id + "");
            renderTrendingSong(time, audioPlayer);
        });
        element.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            openContextMenu(e as MouseEvent, song.id + "");
        });

        trendingSongContainer!.appendChild(element);
    });
};
trendingTodayTab.addEventListener("click", () => {
    renderTrendingSong("today");
    trendingTodayTab.classList.remove("nav-item-active");
    trendingWeekTab.classList.remove("nav-item-active");
    trendingMonthTab.classList.remove("nav-item-active");
    trendingTodayTab.classList.add("nav-item-active");
});
trendingWeekTab.addEventListener("click", () => {
    renderTrendingSong("week");
    trendingTodayTab.classList.remove("nav-item-active");
    trendingWeekTab.classList.remove("nav-item-active");
    trendingMonthTab.classList.remove("nav-item-active");
    trendingWeekTab.classList.add("nav-item-active");
});
trendingMonthTab.addEventListener("click", () => {
    renderTrendingSong("month");
    trendingTodayTab.classList.remove("nav-item-active");
    trendingWeekTab.classList.remove("nav-item-active");
    trendingMonthTab.classList.remove("nav-item-active");
    trendingMonthTab.classList.add("nav-item-active");
});

export { renderTrendingSong };
