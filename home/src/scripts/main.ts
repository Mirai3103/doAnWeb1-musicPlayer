import "../styles/tailwind.css";
import { favoriteArtists } from "./data";
import { createElementFromHTML, generateRandomArray, getTotalTimeFromMp3Url } from "./utils";

const favoriteArtistsElement = document.getElementById("favorite-artists")!;

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
    favoriteArtistsElement.appendChild(artistElement!);
});

const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;
if (user) {
    document.getElementById("user-img")!.setAttribute("src", user.avatar);
    document.getElementById("username")!.innerHTML = user.username;
}

const recentlyAddedElement = document.getElementById("recently-added")!;

/*
 <div class="grid grid-cols-10 font-normal text-sm">
                                            <div class="col-span-1 grid place-content-center">1</div>
                                            <div class="col-span-4 flex items-center gap-x-4 px-2">
                                                <div
                                                    class="max-w-[40px] flex justify-center items-center overflow-hidden"
                                                >
                                                    <img
                                                        class="object-cover rounded-lg flex-shrink-0 min-w-full min-h-full"
                                                        src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/e/7/7/2/e772358978fef8a02eefd34f6a4ca6f3.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div class="font-bold">MONOlogue</div>
                                            </div>
                                            <div class="col-span-2 grid place-content-center">3:35</div>
                                            <div class="col-span-3 grid place-content-center">Mono</div>
                                        </div>
*/
const renderRecentlyAdded = async () => {
    const url = "https://raw.githubusercontent.com/Mirai3103/nodeWeb1/main/generateData/songs.json";
    const response = await (await fetch(url)).json();
    const songs = generateRandomArray(response, 20);

    for (let i = 0; i < songs.length; i++) {
        const song = songs[i];
        const songElement = createElementFromHTML(`
            <div class="grid grid-cols-10 font-normal text-sm hover:text-[#8338ec] hover:bg-slate-50 py-1 cursor-pointer">
                <div class="col-span-1 grid place-content-center">${
                    (i + 1 + "").length == 1 ? "0" + (i + 1) : i + 1
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
                <div class="col-span-2 grid place-content-center">${await getTotalTimeFromMp3Url(song.url)}</div>
                <div class="col-span-3 grid place-content-center text-ellipsis whitespace-nowrap overflow-hidden">${
                    song.artistName
                }</div>
            </div>
        `);
        recentlyAddedElement.appendChild(songElement!);
    }
};

renderRecentlyAdded();
