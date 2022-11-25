import { favoriteArtists } from "./data";
import { createElementFromHTML } from "./utils";

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
    artistElement!.addEventListener("click", () => {
        window.location.hash = "#artist?id=" + artist.id.trim();
    });
    favoriteArtistsElement.appendChild(artistElement!);
});
export {};
