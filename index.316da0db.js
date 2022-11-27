var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) =>
    key in obj
        ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value })
        : (obj[key] = value);
var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
var _a, _b, _c;
(function polyfill() {
    const relList = document.createElement("link").relList;
    if (relList && relList.supports && relList.supports("modulepreload")) {
        return;
    }
    for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
        processPreload(link);
    }
    new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type !== "childList") {
                continue;
            }
            for (const node of mutation.addedNodes) {
                if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
            }
        }
    }).observe(document, { childList: true, subtree: true });
    function getFetchOpts(script) {
        const fetchOpts = {};
        if (script.integrity) fetchOpts.integrity = script.integrity;
        if (script.referrerpolicy) fetchOpts.referrerPolicy = script.referrerpolicy;
        if (script.crossorigin === "use-credentials") fetchOpts.credentials = "include";
        else if (script.crossorigin === "anonymous") fetchOpts.credentials = "omit";
        else fetchOpts.credentials = "same-origin";
        return fetchOpts;
    }
    function processPreload(link) {
        if (link.ep) return;
        link.ep = true;
        const fetchOpts = getFetchOpts(link);
        fetch(link.href, fetchOpts);
    }
})();
class AudioPlayer {
    constructor(audio) {
        __publicField(this, "audio");
        __publicField(this, "currentTrackIndex", 0);
        __publicField(this, "trackList", []);
        __publicField(this, "isPlaying");
        __publicField(this, "isRepeat");
        __publicField(this, "isMute");
        __publicField(this, "isShuffle", false);
        __publicField(this, "volume");
        __publicField(this, "trackEndEvent", []);
        __publicField(this, "trackPauseEvent", []);
        __publicField(this, "trackStartEvent", []);
        __publicField(this, "trackPlayingEvent", []);
        __publicField(this, "queueChangeCallBack", []);
        this.audio = audio;
        this.isPlaying = false;
        this.isRepeat = false;
        this.isMute = false;
        this.volume = 1;
        this.initEvent();
    }
    getRemainingTracks() {
        return this.trackList.slice(this.currentTrackIndex + 1);
    }
    setIndex(index) {
        this.currentTrackIndex = index;
    }
    getIndexOfTrack(trackId) {
        return this.trackList.findIndex((track) => track.id === trackId);
    }
    reloadSource() {
        this.audio.src = this.getCurrentTrack().url;
        this.audio.load();
    }
    initEvent() {
        this.audio.addEventListener("ended", (e) => {
            this.trackEndEvent.forEach((callback) => {
                callback(e);
            });
            this.moveToNextTrack();
        });
        this.audio.addEventListener("pause", (e) => {
            this.trackPauseEvent.forEach((callback) => {
                callback(e);
            });
            this.isPlaying = false;
        });
        this.audio.addEventListener("play", (e) => {
            this.trackStartEvent.forEach((callback) => {
                callback(e);
            });
            this.isPlaying = true;
        });
        this.audio.addEventListener("playing", (e) => {
            this.trackPlayingEvent.forEach((callback) => {
                callback(e);
            });
        });
        this.audio.addEventListener("timeupdate", (e) => {
            this.trackPlayingEvent.forEach((callback) => {
                callback(e);
            });
        });
    }
    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    play() {
        if (this.audio.getAttribute("src") == "#") {
            if (this.trackList.length > 0) {
                this.audio.src = this.trackList[this.currentTrackIndex].url;
                this.audio.load();
                this.audio.play();
            }
            return;
        }
        this.audio.play();
        this.isPlaying = true;
    }
    setCurrentTime(time) {
        this.audio.currentTime = time;
    }
    getDuration() {
        return this.audio.duration;
    }
    pause() {
        this.audio.pause();
        this.isPlaying = false;
    }
    addOnQueueChange(callback) {
        this.queueChangeCallBack.push(callback);
    }
    onQueueChange() {
        this.queueChangeCallBack.forEach((callback) => {
            callback(this);
        });
    }
    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlaying = false;
    }
    setVolume(volume) {
        this.audio.volume = volume;
        this.volume = volume;
    }
    mute() {
        this.audio.volume = 0;
        this.isMute = true;
    }
    unmute() {
        this.audio.volume = this.volume;
        this.isMute = false;
    }
    setTrack(track) {
        this.trackList.push(track);
        this.currentTrackIndex = this.trackList.length - 1;
        this.audio.src = track.url;
        this.audio.load();
        this.play();
    }
    setTrackList(trackList) {
        this.trackList = [...trackList];
        this.currentTrackIndex = 0;
        this.reloadSource();
        this.play();
    }
    moveToNextTrack() {
        if (this.currentTrackIndex < this.trackList.length - 1) {
            if (this.isShuffle) {
                this.currentTrackIndex = Math.floor(Math.random() * this.trackList.length);
            } else {
                this.currentTrackIndex++;
            }
            this.audio.src = this.trackList[this.currentTrackIndex].url;
            this.audio.load();
            this.play();
        } else {
            if (this.isRepeat) {
                if (this.isShuffle) {
                    this.currentTrackIndex = Math.floor(Math.random() * this.trackList.length);
                } else {
                    this.currentTrackIndex = 0;
                }
                this.audio.src = this.trackList[this.currentTrackIndex].url;
                this.audio.load();
                this.play();
            } else {
                this.stop();
            }
        }
    }
    addTrack(track) {
        for (let i = 0; i < this.trackList.length; i++) {
            if (this.trackList[i].id == track.id) {
                return;
            }
        }
        this.trackList.push(track);
        this.onQueueChange();
    }
    getCurrentTrack() {
        return this.trackList[this.currentTrackIndex];
    }
    moveToPrevTrack() {
        if (this.currentTrackIndex > 0) {
            this.currentTrackIndex--;
            this.audio.src = this.trackList[this.currentTrackIndex].url;
            this.play();
        } else {
            if (this.isRepeat) {
                this.currentTrackIndex = this.trackList.length - 1;
                this.audio.src = this.trackList[this.currentTrackIndex].url;
                this.play();
            } else {
                this.audio.currentTime = 0;
            }
        }
    }
    onTrackEnd(callback) {
        this.trackEndEvent.push(callback);
    }
    onTrackPause(callback) {
        this.trackPauseEvent.push(callback);
    }
    onTrackStart(callback) {
        this.trackStartEvent.push(callback);
    }
    onTrackPlaying(callback) {
        this.trackPlayingEvent.push(callback);
    }
    removeEvent(callback) {
        this.trackEndEvent = this.trackEndEvent.filter((c) => c !== callback);
        this.trackPauseEvent = this.trackPauseEvent.filter((c) => c !== callback);
        this.trackStartEvent = this.trackStartEvent.filter((c) => c !== callback);
        this.trackPlayingEvent = this.trackPlayingEvent.filter((c) => c !== callback);
    }
}
const audioElement = document.getElementById("audio-element");
const audioPlayer = new AudioPlayer(audioElement);
const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
if (!user) {
    window.location.pathname = LOGIN_PATH;
}
if (user) {
    document.getElementById("user-img").setAttribute("src", user.avatar);
    document.getElementById("username").innerHTML = user.username;
}
let renctlyPlayed = localStorage.getItem("recentlyPlayed" + user.id)
    ? JSON.parse(localStorage.getItem("recentlyPlayed" + user.id))
    : [];
const addToRecentlyPlayed = (songId) => {
    if (renctlyPlayed.includes(songId)) {
        renctlyPlayed = renctlyPlayed.filter((id) => id !== songId);
    }
    renctlyPlayed.unshift(songId);
    if (renctlyPlayed.length > 20) {
        renctlyPlayed.pop();
    }
    localStorage.setItem("recentlyPlayed" + user.id, JSON.stringify(renctlyPlayed));
};
let favoriteSongs = localStorage.getItem("fs" + user.email) ? JSON.parse(localStorage.getItem("fs" + user.email)) : [];
const toggleFavorite = (songId) => {
    if (favoriteSongs.includes(songId)) {
        favoriteSongs = favoriteSongs.filter((id) => id !== songId);
    } else {
        favoriteSongs.push(songId);
    }
    localStorage.setItem("fs" + user.email, JSON.stringify(favoriteSongs));
};
const isFavorite = (songId) => {
    return favoriteSongs.includes(songId);
};
const signOut = () => {
    localStorage.removeItem("user");
    window.location.pathname = LOGIN_PATH;
};
const userContextMenu = document.getElementById("user-context-menu");
const openUserContextMenu = () => {
    userContextMenu.classList.remove("hidden");
};
const closeUserContextMenu = () => {
    userContextMenu.classList.add("hidden");
};
const toggleUserContextMenu = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(userContextMenu.classList);
    if (userContextMenu.classList.contains("hidden")) {
        openUserContextMenu();
    } else {
        closeUserContextMenu();
    }
};
document.addEventListener("click", (e) => {
    if (userContextMenu && !userContextMenu.contains(e.target)) {
        closeUserContextMenu();
    }
});
window.addEventListener(
    "scroll",
    () => {
        closeUserContextMenu();
    },
    true
);
document.getElementById("auth-btn").addEventListener("click", toggleUserContextMenu);
audioPlayer.onTrackStart(() => {
    addToRecentlyPlayed(audioPlayer.getCurrentTrack().id + "");
});
const favoriteArtists = [
    {
        id: "mono",
        name: "Mono",
        url: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/8/e/6/2/8e62fe317658a5c4fc4db6f2f5c75a62.jpg",
    },
    {
        id: "mtp",
        name: "S\u01A1n T\xF9ng M-TP",
        url: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/8/a/a/b/8aab7a0386dd9c24b90adcc5ef5a7814.jpg",
    },
    {
        id: "phanmanhquynh",
        name: "Phan M\u1EA1nh Qu\u1EF3nh",
        url: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/1/6/a/d/16ad38a571e873f840bbfc0d97214baa.jpg",
    },
    {
        id: "louhoang",
        name: "Lou Ho\xE0ng",
        url: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/3/1/d/0/31d0f0e35548bd22f2f0e962eabf3c48.jpg",
    },
    {
        id: "bray",
        name: "B Ray",
        url: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/6/5/1/9/651942a9fe205c76b3821246af5d6742.jpg",
    },
    {
        id: "binz",
        name: "Binz",
        url: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/4/8/9/1/4891c7eef87e3ac85a50a2fba2674f5a.jpg",
    },
    {
        id: "amee",
        name: "AMEE",
        url: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/9/8/4/d/984de8b3596498462d5f954eadbb1f47.jpg",
    },
    {
        id: "tuanhung",
        name: "Tu\u1EA5n H\u01B0ng",
        url: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/3/e/0/6/3e06ae7740102e7662db8cbca392d9a6.jpg",
    },
    {
        id: "denvau",
        name: "\u0110en",
        url: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/9/0/2/2/90223f08b220e52a78ac5c0dd739256f.jpg",
    },
];
let listTrack = null;
const getListTrack = async () => {
    if (listTrack) return listTrack;
    else {
        const res = await fetch("https://raw.githubusercontent.com/Mirai3103/nodeWeb1/main/generateData/songs.json");
        const data = await res.json();
        listTrack = [...data];
        return listTrack;
    }
};
getListTrack();
const getTrackById = async (id) => {
    return (await getListTrack()).find((track) => track.id === id);
};
const createElementFromHTML = (htmlString) => {
    const div = document.createElement("div");
    div.innerHTML = htmlString.trim();
    return div.firstChild;
};
const covertTime = (timeMili) => {
    const time = timeMili / 1e3;
    let mins = Math.floor(time / 60);
    if (mins < 10) {
        mins = "0" + String(mins);
    }
    let secs = Math.floor(time % 60);
    if (secs < 10) {
        secs = "0" + String(secs);
    }
    return mins + ":" + secs;
};
const formatNumber = (num, numberOfMaxDigit) => {
    let str = num + "";
    while (str.length < numberOfMaxDigit) {
        str = "0" + str;
    }
    return str;
};
const handleSongClick$1 = async (songId) => {
    const songs = await getListTrack();
    const song = songs.find((song2) => song2.id == songId);
    if (song) {
        audioPlayer.setTrack(song);
    }
};
const contextMenu = document.getElementById("context-menu");
const closeContextMenu = () => {
    contextMenu.classList.add("hidden");
};
const handleClickOutside = (e) => {
    if (contextMenu && !contextMenu.contains(e.target)) {
        closeContextMenu();
    }
};
document.addEventListener("click", handleClickOutside);
window.addEventListener(
    "scroll",
    () => {
        closeContextMenu();
    },
    true
);
const openContextMenu = async (e, songId) => {
    contextMenu.classList.add("hidden");
    if (!(await renderContextMenu(songId))) {
        contextMenu.classList.add("hidden");
        return;
    }
    contextMenu.classList.remove("hidden");
    const screenH = window.innerHeight;
    const screenW = window.innerWidth;
    const contextMenuH = contextMenu.offsetHeight;
    const contextMenuW = contextMenu.offsetWidth;
    const x = e.clientX;
    const y = e.clientY;
    console.log(x, y);
    console.log(screenW, screenH);
    console.log(contextMenuW, contextMenuH);
    if (x + contextMenuW > screenW) {
        contextMenu.style.left = x - contextMenuW + "px";
    } else {
        contextMenu.style.left = x + "px";
    }
    if (y + contextMenuH > screenH) {
        contextMenu.style.top = y - contextMenuH + "px";
    } else {
        contextMenu.style.top = y + "px";
    }
};
const renderContextMenu = async (songId) => {
    const song = await getTrackById(songId);
    console.log(song);
    if (!song) {
        return false;
    }
    const contextMenu2 = document.getElementById("context-menu");
    contextMenu2.innerHTML = "";
    const isfavorite = await isFavorite(songId);
    const element = createElementFromHTML(`
    <div>
    <div class="px-2 flex gap-x-2 items-center border-b pb-2">
        <div class="min-w-[40px] max-w-[40px] h-full flex justify-center items-center overflow-hidden relative">
            <img
                class="h-full object-cover rounded-lg flex-shrink-0 w-full"
                src="${song.thumbnailUrl}"
                alt="${song.name}"
            />
        </div>
        <div class="font-bold">${song.name}</div>
    </div>
    <div class="flex flex-col py-2">
        <div class="p-2 py-4 flex gap-x-2 items-cente hover:bg-[#8f49f2] cursor-pointer toggle-favorive">
            ${
                isfavorite
                    ? `<i class="fa-solid fa fa-heart"></i> <span>Xo\xE1 kh\u1ECFi y\xEAu th\xEDch</span>`
                    : `<i class="fa-regular fa-heart"></i> <span>Th\xEAm v\xE0o y\xEAu th\xEDch</span>`
            } 
        </div>
        <div class="p-2 py-4 flex gap-x-2 items-center hover:bg-[#8f49f2] cursor-pointer add-to-queue">
            <i class="fa-solid fa-plus"></i><span>Th\xEAm v\xE0o danh s\xE1ch ph\xE1t</span>
        </div>
        <div class="p-2 py-4 flex gap-x-2 items-center hover:bg-[#8f49f2] cursor-pointer">
            <i class="fa-solid fa-download"></i><span>T\u1EA3i xu\u1ED1ng</span>
        </div>
    </div>
</div>`);
    contextMenu2.appendChild(element);
    element.querySelector(".add-to-queue").addEventListener("click", () => {
        audioPlayer.addTrack(song);
        closeContextMenu();
    });
    element.querySelector(".toggle-favorive").addEventListener("click", () => {
        toggleFavorite(songId);
        closeContextMenu();
    });
    return true;
};
let currentTimeState = "today";
let audioPlayerOld = null;
const trendingTodayTab = document.getElementById("trending-today-tab");
const trendingWeekTab = document.getElementById("trending-week-tab");
const trendingMonthTab = document.getElementById("trending-month-tab");
const handleSongClick = async (songId, audioPlayer2) => {
    if (songId === audioPlayer2.getCurrentTrack().id + "") {
        audioPlayer2.togglePlay();
        return;
    }
    const songs = await getListTrack();
    const song = songs.find((song2) => song2.id == songId);
    if (song) {
        audioPlayer2.setTrack(song);
    }
};
let cachedTrending = {
    today: [],
    week: [],
    month: [],
};
const renderTrendingSong = async (time = null, audioPlayer2 = null) => {
    const trendingSongContainer = document.querySelector("#trendingsong");
    if (audioPlayer2) {
        audioPlayerOld = audioPlayer2;
    } else {
        audioPlayer2 = audioPlayerOld;
    }
    trendingSongContainer.innerHTML = `<div class="flex justify-center items-center"><div class="loader"></div></div>`;
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
    const songs = cachedTrending[time].length > 0 ? [...cachedTrending[time]] : await (await fetch(url)).json();
    console.log("ok");
    trendingSongContainer.innerHTML = "";
    let currentTrackId = null;
    if (audioPlayer2) {
        currentTrackId = audioPlayer2.getCurrentTrack().id + "";
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
                                                    currentTrackId === song.id &&
                                                    (audioPlayer2 == null ? void 0 : audioPlayer2.isPlaying)
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
        const element = createElementFromHTML(htmlString);
        element.querySelector(".play-song-btn").addEventListener("click", (e) => {
            handleSongClick(song.id + "", audioPlayer2);
        });
        element.querySelector(".add-favorite-btn").addEventListener("click", (e) => {
            toggleFavorite(song.id + "");
            renderTrendingSong(time, audioPlayer2);
        });
        element.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            openContextMenu(e, song.id + "");
        });
        trendingSongContainer.appendChild(element);
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
const tailwind = "";
const favoriteArtistsElement = document.getElementById("favorite-artists");
favoriteArtists.forEach((artist) => {
    const artistElement = createElementFromHTML(`
        <div class="flex justify-between cursor-pointer hover:bg-slate-100 px-4 py-1 rounded-md">
                                        <div class="flex gap-x-3">
                                            <div class="flex justify-center max-w-[50px] items-center">
                                                <img
                                                    class="object-fill rounded-lg flex-shrink-0 min-w-full min-h-full"
                                                    src="${artist.url}"
                                                    alt=""
                                                />
                                            </div>
                                            <div>
                                                <div class="text-base artistName">${artist.name}</div>
                                                <div class="text-sm font-light text-gray-500">${Math.floor(
                                                    Math.random() * 55 + 1
                                                )}M plays</div>
                                            </div>
                                        </div>
                                        <div class="font-bold text-3xl">...</div>
                                    </div>
    `);
    artistElement.addEventListener("click", () => {
        window.location.hash = "#artist?id=" + artist.id.trim();
    });
    favoriteArtistsElement.appendChild(artistElement);
});
let isShow = false;
const queueViewElement = document.getElementById("queue-view");
const toggleQueueView = () => {
    if (isShow) {
        queueViewElement.classList.add("w-0");
        queueViewElement.classList.remove("w-queue");
        isShow = false;
    } else {
        queueViewElement.classList.add("w-queue");
        queueViewElement.classList.remove("w-0");
        isShow = true;
    }
};
const renderQueueView = (audioPlayer2) => {
    const nowPlayingContainer = document.getElementById("now-playing-container");
    const nextSongsContainer = document.getElementById("next-song-container");
    nowPlayingContainer.innerHTML = "";
    nextSongsContainer.innerHTML = "";
    const remainingTracks = audioPlayer2.getRemainingTracks();
    const nowPlayingTrack = audioPlayer2.getCurrentTrack();
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
    nowPlayingContainer.appendChild(nowPlayingElement);
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
        nextSongElement.querySelector(".play-song-btn").addEventListener("click", (e) => {
            const index = audioPlayer2.getIndexOfTrack(track.id);
            if (index == -1) {
                handleSongClick$1(track.id + "");
            }
            audioPlayer2.setIndex(index);
            audioPlayer2.reloadSource();
            audioPlayer2.play();
        });
        nextSongsContainer.appendChild(nextSongElement);
    }
};
let queueViewState = "queue";
const initQueueView = (audioPlayer2) => {
    document.getElementById("toggle-queue-btn").addEventListener("click", () => {
        toggleQueueView();
    });
    renderView(audioPlayer2);
    const queueBtn = document.getElementById("queue-btn");
    const recentlyBtn = document.getElementById("recently-btn");
    queueBtn == null
        ? void 0
        : queueBtn.addEventListener("click", () => {
              if (queueViewState == "queue") {
                  return;
              }
              queueViewState = "queue";
              queueBtn.classList.add("active");
              recentlyBtn == null ? void 0 : recentlyBtn.classList.remove("active");
              renderView(audioPlayer2);
          });
    recentlyBtn == null
        ? void 0
        : recentlyBtn.addEventListener("click", () => {
              console.log("click 2", queueViewState);
              if (queueViewState == "recently") {
                  return;
              }
              queueViewState = "recently";
              recentlyBtn.classList.add("active");
              queueBtn == null ? void 0 : queueBtn.classList.remove("active");
              renderView(audioPlayer2);
          });
    audioPlayer2.onTrackStart(() => {
        renderView(audioPlayer2);
    });
    audioPlayer2.addOnQueueChange(() => {
        renderView(audioPlayer2);
    });
};
const renderRecently = async () => {
    const container = document.getElementById("recently-container");
    for (let i = 0; i < renctlyPlayed.length; i++) {
        const track = await getTrackById(renctlyPlayed[i]);
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
        nextSongElement.querySelector(".play-song-btn").addEventListener("click", (e) => {
            const index = audioPlayer.getIndexOfTrack(track.id);
            if (index == -1) {
                handleSongClick$1(track.id + "");
            }
            audioPlayer.setIndex(index);
            audioPlayer.reloadSource();
            audioPlayer.play();
        });
        container.appendChild(nextSongElement);
    }
};
const renderView = (audioPlayer2) => {
    if (queueViewState == "queue") {
        document.getElementById(
            "queueViewContainer"
        ).innerHTML = `<div class="font-semibold text-lg text-[#8338ec]">Now playing</div>
                    <div id="now-playing-container" class="pl-2 py-2"></div>
                    <div class="font-semibold text-lg text-[#8338ec]">Next from queue</div>
                    <div id="next-song-container" class="pl-2 py-2"></div>`;
        renderQueueView(audioPlayer2);
    } else {
        document.getElementById(
            "queueViewContainer"
        ).innerHTML = `<div class="font-semibold text-lg text-[#8338ec]">Recently</div>
                    <div id="recently-container" class="pl-2 py-2"></div>`;
        renderRecently();
    }
};
class BaseComponent {
    constructor() {
        __publicField(this, "name", "");
    }
}
class Album extends BaseComponent {
    constructor(container, album) {
        super();
        __publicField(this, "name", "AlbumPage");
        __publicField(this, "album");
        this.container = container;
        this.album = album;
    }
    async renderFavoriteSong() {
        const favoriteSongsListContainer = document.getElementById("favorite-songs-container");
        favoriteSongsListContainer.innerHTML = ``;
        const favoriteSongsList = this.album.listTracks;
        if (favoriteSongsList.length === 0) {
            favoriteSongsListContainer.innerHTML = `<div class="font-bold text-xl text-center w-full">Danh s\xE1ch y\xEAu th\xEDch tr\u1ED1ng</div>`;
            return;
        }
        let i = -1;
        for (const song of favoriteSongsList) {
            const track = await getTrackById(song);
            if (!track) {
                continue;
            }
            const element = createElementFromHTML(`
         <div class="flex border-b py-2 gap-y-1 hover:text-[#8338ec] hover:bg-white gap-x-2">
         <div class="basis-7 flex items-center ml-2">${
             audioPlayer.getCurrentTrack().id === track.id
                 ? `<div class="music-waves -ml-2 -mb-2">
                                                            <span></span>
                                                            <span></span>
                                                            <span></span>
                                                            <span></span>
                                                            <span></span>
                                                        </div>`
                 : formatNumber(++i + 1, 2)
         }</div>
                                        <div class="basis-[550px] flex items-center gap-x-4 px-2 cursor-pointer">
                                            <div
                                                    class="min-w-[40px] min-h-[40px] max-w-[40px] h-full flex justify-center items-center overflow-hidden"
                                                >
                                                    <img
                                                        class="h-full object-cover rounded-lg flex-shrink-0 w-full"
                                                        src="${track.thumbnailUrl}"
                                                        alt="${track.name}"
                                                    />
                                                </div>
                                            <div
                                                class="font-bold text-ellipsis whitespace-nowrap overflow-hidden flex flex-col"
                                            >
                                                <span class="overflow-hidden max-w-[400px] text-ellipsis whitespace-nowrap">${
                                                    track.name
                                                }</span>
                                            </div>
                                        </div>
                                        <div class="basis-[480px] flex items-center text-ellipsis whitespace-nowrap overflow-hidden">${
                                            track.artistName
                                        }</div>
                                        <div class="basis-7 flex items-center cursor-pointer">
                                            <i class="fa-sharp fa-solid fa-heart"></i>
                                        </div>
                                        <div class="grow flex items-center">${covertTime(track.totalTime)}</div>
         </div>
                                            `);
            element.addEventListener("click", () => {
                handleSongClick$1(track.id + "");
            });
            element.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                openContextMenu(e, track.id + "");
            });
            favoriteSongsListContainer.appendChild(element);
        }
    }
    render() {
        this.container.innerHTML = ` <div class="p-3 flex flex-col gap-y-5 ">
                                <div class="border-b px-7 pb-5 flex gap-x-3">
                                <div class="flex rounded-lg p-1 justify-center items-center border shadow-md max-w-[150px]"><img class="rounded-lg h-auto object-cover" src="${this.album.imageCover}" /></div>
                                <div class="text-4xl flex gap-x-4 items-center">
                                    <div class="font-bold">${this.album.name}</div>
                                    <div
                                    id="add-all-to-playlist"
                                        class="w-14 h-14 bg-[#8338ec] rounded-full cursor-pointer text-white flex justify-center items-center"
                                    >
                                        <i class="fa-solid fa-play"></i>
                                    </div>
                                </div>
                                </div>
                                <div class="flex flex-col">
                                    <div class="flex py-2 gap-x-2 border-b font-semibold text-lg uppercase">
                                        <div class="basis-7  ml-2">#</div>
                                        <div class="basis-[550px]">B\xC0I H\xC1T</div>
                                        <div class="basis-[480px]">Ca s\u0129</div>
                                        <div class="basis-7"></div>
                                        <div class="grow">Th\u1EDDi gian</div>
                                    </div>
                                    <div
                                        id="favorite-songs-container"
                                        class="w-full"
                                    ></div>
                                </div>
                            </div>`;
        const addAllToPlaylist = document.getElementById("add-all-to-playlist");
        addAllToPlaylist.addEventListener("click", async () => {
            const listTrack2 = [];
            for (const song of this.album.listTracks) {
                const track = await getTrackById(song);
                if (!track) {
                    continue;
                }
                listTrack2.push(track);
            }
            audioPlayer.setTrackList(listTrack2);
        });
        this.renderFavoriteSong();
        audioPlayer.onTrackStart(() => {
            this.renderFavoriteSong();
        });
    }
    destroy() {
        console.log("FavoritePage destroy");
    }
}
document.getElementById("sign-out-btn").addEventListener("click", signOut);
const recentlyAddedElement = document.getElementById("recently-added");
let recentSongs = null;
const renderRecentlyAdded = async (audioPlayer2 = null) => {
    recentlyAddedElement.innerHTML = `<div class="flex justify-center items-center"><div class="loader"></div></div>`;
    if (!recentSongs) {
        const url = "https://raw.githubusercontent.com/Mirai3103/nodeWeb1/main/generateData/recentlyAdded.json";
        const response = await (await fetch(url)).json();
        recentSongs = [...response];
    }
    const songs = recentSongs;
    let currentTrackId = null;
    if (audioPlayer2) {
        currentTrackId = audioPlayer2.getCurrentTrack().id + "";
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
        songElement.addEventListener("click", () => {
            handleSongClick$1(song.id + "");
        });
        songElement.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            openContextMenu(e, song.id + "");
        });
        recentlyAddedElement.appendChild(songElement);
    }
};
const playBtn = document.getElementById("play-btn");
const preSongBtn = document.getElementById("pre-song-btn");
const nextSongBtn = document.getElementById("next-song-btn");
const playingProcess = document.getElementById("playping-process");
const processPoint = document.getElementById("process-point");
const processBar = document.getElementById("process-bar");
const loopBtn = document.getElementById("loop");
const shuffleBtn = document.getElementById("shuffle");
const currentPlayImg = document.getElementById("current-play-img");
const currentSongName = document.getElementById("current-song-name");
const currentArtistName = document.getElementById("current-artist-name");
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
const onProcessBarClick = (e) => {
    const MAX_PROCESS_WIDTH = processBar.offsetWidth;
    const percentage = Number(e.offsetX) / Number(MAX_PROCESS_WIDTH);
    const currentTime = Math.floor(Number(audioPlayer.getDuration()) * percentage);
    audioPlayer.setCurrentTime(currentTime);
};
const movePointOnPlaying = (e) => {
    const MAX_PROCESS_WIDTH = processBar.offsetWidth;
    const percentage = Number(e.target.currentTime) / Number(e.target.duration);
    playingProcess.style.width = Math.floor(percentage * MAX_PROCESS_WIDTH) + "px";
    processPoint.style.width = Math.floor(percentage * MAX_PROCESS_WIDTH) + "px";
};
const hanldeTimeUpdate = (e) => {
    document.getElementById("current-time").innerHTML = covertTime(e.target.currentTime * 1e3);
};
const onPlay = () => {
    document.getElementById("max-time").innerHTML = covertTime(audioPlayer.getCurrentTrack().totalTime);
    currentArtistName.innerHTML = audioPlayer.getCurrentTrack().artistName;
    currentSongName.innerHTML = audioPlayer.getCurrentTrack().name;
    currentPlayImg.src = audioPlayer.getCurrentTrack().thumbnailUrl;
};
(_a = document.getElementById("process-bar-line")) == null ? void 0 : _a.addEventListener("click", onProcessBarClick);
(_b = document.getElementById("playping-process")) == null ? void 0 : _b.addEventListener("click", onProcessBarClick);
(_c = document.getElementById("process-point")) == null ? void 0 : _c.addEventListener("click", onProcessBarClick);
audioPlayer.onTrackPlaying(movePointOnPlaying);
audioPlayer.onTrackPlaying(hanldeTimeUpdate);
audioPlayer.onTrackStart(onPlay);
audioPlayer.addTrack({
    id: "ZW9AZC68",
    name: "C\xF3 Ch\xE0ng Trai Vi\u1EBFt L\xEAn C\xE2y",
    url: "https://res.cloudinary.com/dkvga054t/video/upload/v1668843811/songs/2675035284037628448.mp3",
    artistName: "Phan M\u1EA1nh Qu\u1EF3nh",
    thumbnailUrl:
        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/covers/f/f/ffd96dc18d252825cb591e255ddc6dbd_1513860881.jpg",
    artistImgUrl:
        "https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/1/6/a/d/16ad38a571e873f840bbfc0d97214baa.jpg",
    totalTime: 310008,
});
initQueueView(audioPlayer);
const volumeBar = document.getElementById("volume-bar");
const volumeBarLine = document.getElementById("volume-bar-line");
const volumeProcess = document.getElementById("volume-process");
const volumePoint = document.getElementById("volume-point");
const onVolumeBarClick = (e) => {
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
document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});
if (window.location.hash.includes("signin")) {
    window.location.hash = "";
}
const handleHashChange = async (e) => {
    var _a2, _b2, _c2;
    const hash = window.location.hash;
    const page = hash.split("?")[0];
    switch (page) {
        case "#favorite": {
            const album = {
                imageCover:
                    "https://res.cloudinary.com/dkvga054t/image/upload/v1669367712/pngtree-vinyl-line-icon-heart-record-png-image_8230774-removebg-preview_haoqpu.png",
                listTracks: [...favoriteSongs],
                name: "Favorite song",
            };
            const favoritePage = new Album(document.getElementById("other-page"), album);
            favoritePage.render();
            (_a2 = document.getElementById("other-page")) == null ? void 0 : _a2.classList.remove("hidden");
            break;
        }
        case "#album": {
            if (hash.split("?").length < 2) {
                window.location.hash = "#";
                return;
            }
            new URLSearchParams(hash.split("?")[1]);
        }
        case "#artist": {
            if (hash.split("?").length < 2) {
                window.location.hash = "#";
                return;
            }
            const queryParam = new URLSearchParams(hash.split("?")[1]);
            const artistId = queryParam.get("id");
            const artist = favoriteArtists.find((a) => a.id === artistId);
            console.log(artist);
            if (!artist) {
                window.location.hash = "#";
                return;
            }
            const listSongOfArtist = (await getListTrack())
                .filter((t) => t.artistName.toLowerCase().includes(artist.name.toLowerCase()))
                .map((t) => t.id + "");
            const album = {
                imageCover: artist.url,
                listTracks: listSongOfArtist,
                name: artist.name,
            };
            const artistPage = new Album(document.getElementById("other-page"), album);
            artistPage.render();
            (_b2 = document.getElementById("other-page")) == null ? void 0 : _b2.classList.remove("hidden");
            break;
        }
        default: {
            (_c2 = document.getElementById("other-page")) == null ? void 0 : _c2.classList.add("hidden");
        }
    }
    document.getElementById("r-view").scrollTo(0, 0);
};
handleHashChange();
window.addEventListener("hashchange", handleHashChange);
