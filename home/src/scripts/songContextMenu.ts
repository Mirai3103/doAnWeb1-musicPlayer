import { createElementFromHTML } from "./utils";
import { getTrackById } from "./data";
import { audioPlayer } from "./AudioPlayer";
import { isFavorite, toggleFavorite } from "./auth";
const contextMenu = document.getElementById("context-menu")!;

const closeContextMenu = () => {
    contextMenu!.classList.add("hidden");
};

const handleClickOutside = (e: MouseEvent) => {
    if (contextMenu && !contextMenu.contains(e.target as Node)) {
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
export const openContextMenu = async (e: MouseEvent, songId: string) => {
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

const renderContextMenu = async (songId: string) => {
    const song = await getTrackById(songId);
    console.log(song);
    if (!song) {
        return false;
    }
    const contextMenu = document.getElementById("context-menu")!;
    contextMenu.innerHTML = "";
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
                    ? `<i class="fa-solid fa fa-heart"></i> <span>Xoá khỏi yêu thích</span>`
                    : `<i class="fa-regular fa-heart"></i> <span>Thêm vào yêu thích</span>`
            } 
        </div>
        <div class="p-2 py-4 flex gap-x-2 items-center hover:bg-[#8f49f2] cursor-pointer add-to-queue">
            <i class="fa-solid fa-plus"></i><span>Thêm vào danh sách phát</span>
        </div>
        <div class="p-2 py-4 flex gap-x-2 items-center hover:bg-[#8f49f2] cursor-pointer">
            <i class="fa-solid fa-download"></i><span>Tải xuống</span>
        </div>
    </div>
</div>`)!;
    contextMenu.appendChild(element);
    (element as HTMLElement).querySelector(".add-to-queue")!.addEventListener("click", () => {
        audioPlayer.addTrack(song);
        closeContextMenu();
    });
    (element as HTMLElement).querySelector(".toggle-favorive")!.addEventListener("click", () => {
        toggleFavorite(songId);
        closeContextMenu();
    });

    return true;
};
