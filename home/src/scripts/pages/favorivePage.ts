// import { getTrackById } from "./../data";
// import { covertTime, createElementFromHTML } from "./../utils";
// import { favoriteSongs } from "../auth";
// import BaseComponent from "./BaseComponent";

// export default class FavoritePage extends BaseComponent {
//     public name: string = "FavoritePage";
//     public constructor(private container: HTMLElement) {
//         super();
//     }
//     private async renderFavoriteSong(): Promise<void> {
//         const favoriteSongsListContainer = document.getElementById("favorite-songs-container")!;
//         favoriteSongsListContainer.innerHTML = ``;

//         const favoriteSongsList = [...favoriteSongs];
//         if (favoriteSongsList.length === 0) {
//             favoriteSongsListContainer.innerHTML = `<div class="font-bold text-xl text-center w-full">Danh sách yêu thích trống</div>`;
//             return;
//         }
//         let i = 1;
//         for (const song of favoriteSongsList) {
//             const track = await getTrackById(song);
//             if (!track) {
//                 continue;
//             }
//             const element = createElementFromHTML(`
//          <div class="flex border-b py-2 gap-y-1 hover:text-[#8338ec] hover:bg-white gap-x-2">
//          <div class="basis-7 flex items-center ml-2">${i++}</div>
//                                         <div class="basis-[550px] flex items-center gap-x-4 px-2 cursor-pointer">
//                                             <div
//                                                     class="min-w-[40px] min-h-[40px] max-w-[40px] h-full flex justify-center items-center overflow-hidden"
//                                                 >
//                                                     <img
//                                                         class="h-full object-cover rounded-lg flex-shrink-0 w-full"
//                                                         src="${track.thumbnailUrl}"
//                                                         alt="${track.name}"
//                                                     />
//                                                 </div>
//                                             <div
//                                                 class="font-bold text-ellipsis whitespace-nowrap overflow-hidden flex flex-col"
//                                             >
//                                                 <span>${track.name}</span>
//                                             </div>
//                                         </div>
//                                         <div class="basis-[480px] flex items-center">${track.artistName}</div>
//                                         <div class="basis-7 flex items-center cursor-pointer">
//                                             <i class="fa-sharp fa-solid fa-heart"></i>
//                                         </div>
//                                         <div class="grow flex items-center">${covertTime(track.totalTime)}</div>
//          </div>
//                                             `)!;
//             favoriteSongsListContainer.appendChild(element);
//         }
//     }
//     public render(): void {
//         this.container.innerHTML = ` <div class="p-3 flex flex-col gap-y-5 ">
//                                 <div class="border-b px-7 pb-5 flex gap-x-3">
//                                 <div class="flex rounded-lg p-1 justify-center items-center border shadow-md max-w-[150px]"><img class="rounded-lg h-auto object-cover" src="https://res.cloudinary.com/dkvga054t/image/upload/v1669367712/pngtree-vinyl-line-icon-heart-record-png-image_8230774-removebg-preview_haoqpu.png" /></div>
//                                 <div class="text-4xl flex gap-x-4 items-center">
//                                     <div class="font-bold">Favorite songs</div>
//                                     <div
//                                         class="w-14 h-14 bg-[#8338ec] rounded-full cursor-pointer text-white flex justify-center items-center"
//                                     >
//                                         <i class="fa-solid fa-play"></i>
//                                     </div>
//                                 </div>
//                                 </div>
//                                 <div class="flex flex-col">
//                                     <div class="flex py-2 gap-x-2 border-b font-semibold text-lg uppercase">
//                                         <div class="basis-7  ml-2">#</div>
//                                         <div class="basis-[550px]">BÀI HÁT</div>
//                                         <div class="basis-[480px]">Ca sĩ</div>
//                                         <div class="basis-7"></div>
//                                         <div class="grow">Thời gian</div>
//                                     </div>
//                                     <div
//                                         id="favorite-songs-container"
//                                         class="w-full"
//                                     ></div>
//                                 </div>
//                             </div>`;
//         this.renderFavoriteSong();
//     }
//     public destroy(): void {
//         console.log("FavoritePage destroy");
//     }
// }
export {};
