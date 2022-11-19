import { audioPlayer } from "./AudioPlayer";
const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;

if (!user) {
    window.location.pathname = "/login";
}
if (user) {
    document.getElementById("user-img")!.setAttribute("src", user.avatar);
    document.getElementById("username")!.innerHTML = user.username;
}
let renctlyPlayed: string[] = localStorage.getItem("recentlyPlayed" + user.id)
    ? JSON.parse(localStorage.getItem("recentlyPlayed" + user.id)!)
    : [];
const addToRecentlyPlayed = (songId: string) => {
    if (renctlyPlayed.includes(songId)) {
        renctlyPlayed = renctlyPlayed.filter((id) => id !== songId);
    }
    renctlyPlayed.unshift(songId);
    if (renctlyPlayed.length > 20) {
        renctlyPlayed.pop();
    }
    localStorage.setItem("recentlyPlayed" + user.id, JSON.stringify(renctlyPlayed));
};
let favoriteSongs: string[] = localStorage.getItem("fs" + user.email)
    ? JSON.parse(localStorage.getItem("fs" + user.email)!)
    : [];
const toggleFavorite = (songId: string) => {
    if (favoriteSongs.includes(songId)) {
        favoriteSongs = favoriteSongs.filter((id) => id !== songId);
    } else {
        favoriteSongs.push(songId);
    }
    localStorage.setItem("fs" + user.email, JSON.stringify(favoriteSongs));
};
const isFavorite = (songId: string) => {
    return favoriteSongs.includes(songId);
};
const signOut = () => {
    localStorage.removeItem("user");
    window.location.pathname = "/login";
};
const userContextMenu = document.getElementById("user-context-menu")!;
const openUserContextMenu = () => {
    userContextMenu.classList.remove("hidden");
};
const closeUserContextMenu = () => {
    userContextMenu.classList.add("hidden");
};

const toggleUserContextMenu = (e: MouseEvent) => {
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
    if (userContextMenu && !userContextMenu.contains(e.target as Node)) {
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
document.getElementById("auth-btn")!.addEventListener("click", toggleUserContextMenu);
audioPlayer.onTrackStart(() => {
    addToRecentlyPlayed(audioPlayer.getCurrentTrack().id + "");
});
export {
    addToRecentlyPlayed,
    toggleFavorite,
    isFavorite,
    renctlyPlayed,
    favoriteSongs,
    signOut,
    toggleUserContextMenu,
};
export default user;
