import { getTrackById } from "./../data";
import { covertTime, createElementFromHTML, formatNumber, handleSongClick } from "./../utils";
import BaseComponent from "./BaseComponent";
import { IAlbum } from "./Album";
import { audioPlayer, Track } from "../AudioPlayer";
import { openContextMenu } from "../songContextMenu";

export default class Album extends BaseComponent {
    public name: string = "AlbumPage";
    private album: IAlbum;
    public constructor(private container: HTMLElement, album: IAlbum) {
        super();
        this.album = album;
    }
    private async renderFavoriteSong() {
        const favoriteSongsListContainer = document.getElementById("favorite-songs-container")!;
        favoriteSongsListContainer.innerHTML = ``;

        const favoriteSongsList = this.album.listTracks;
        if (favoriteSongsList.length === 0) {
            favoriteSongsListContainer.innerHTML = `<div class="font-bold text-xl text-center w-full">Danh sách yêu thích trống</div>`;
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
                                            `)!;
            element.addEventListener("click", () => {
                handleSongClick(track.id + "");
            });
            element.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                openContextMenu(e as MouseEvent, track.id + "");
            });
            favoriteSongsListContainer.appendChild(element);
        }
    }
    public render(): void {
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
                                        <div class="basis-[550px]">BÀI HÁT</div>
                                        <div class="basis-[480px]">Ca sĩ</div>
                                        <div class="basis-7"></div>
                                        <div class="grow">Thời gian</div>
                                    </div>
                                    <div
                                        id="favorite-songs-container"
                                        class="w-full"
                                    ></div>
                                </div>
                            </div>`;
        const addAllToPlaylist = document.getElementById("add-all-to-playlist")!;
        addAllToPlaylist.addEventListener("click", async () => {
            const listTrack: Track[] = [];
            for (const song of this.album.listTracks) {
                const track = await getTrackById(song);
                if (!track) {
                    continue;
                }
                listTrack.push(track);
            }
            audioPlayer.setTrackList(listTrack);
        });
        this.renderFavoriteSong();
        audioPlayer.onTrackStart(() => {
            this.renderFavoriteSong();
        });
    }
    public destroy(): void {
        console.log("FavoritePage destroy");
    }
}
