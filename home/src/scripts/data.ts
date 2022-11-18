import { Track } from "./AudioPlayer";
interface IArtist {
    name: string;
    url: string;
}
export const favoriteArtists: IArtist[] = [
    {
        name: "Mono",
        url: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/8/e/6/2/8e62fe317658a5c4fc4db6f2f5c75a62.jpg",
    },
    {
        name: "Sơn Tùng M-TP",
        url: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/8/a/a/b/8aab7a0386dd9c24b90adcc5ef5a7814.jpg",
    },
    {
        name: "Phan Mạnh Quỳnh",
        url: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/1/6/a/d/16ad38a571e873f840bbfc0d97214baa.jpg",
    },
    {
        name: "Lou Hoàng",
        url: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/3/1/d/0/31d0f0e35548bd22f2f0e962eabf3c48.jpg",
    },
    {
        name: "B Ray",
        url: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/6/5/1/9/651942a9fe205c76b3821246af5d6742.jpg",
    },
    {
        name: "Binz",
        url: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/4/8/9/1/4891c7eef87e3ac85a50a2fba2674f5a.jpg",
    },
    {
        name: "AMEE",
        url: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/9/8/4/d/984de8b3596498462d5f954eadbb1f47.jpg",
    },
    {
        name: "Tuấn Hưng",
        url: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/3/e/0/6/3e06ae7740102e7662db8cbca392d9a6.jpg",
    },
    {
        name: "Đen",
        url: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/9/0/2/2/90223f08b220e52a78ac5c0dd739256f.jpg",
    },
];

let listTrack: Track[] | null = null;

export const getListTrack = async () => {
    if (listTrack) return listTrack;
    else {
        const res = await fetch("https://raw.githubusercontent.com/Mirai3103/nodeWeb1/main/generateData/songs.json");
        const data = await res.json();
        listTrack = [...data];
        return listTrack;
    }
};

getListTrack();
