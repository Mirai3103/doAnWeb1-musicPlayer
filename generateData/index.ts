import { json } from "stream/consumers";
import { ZingMp3 } from "zingmp3-api-full";
import fs from "fs";
export class Track {
    public id: string = "";
    public name: string;
    public url: string;
    public artistName: string;
    public genre?: string | undefined;
    public thumbnailUrl?: string | undefined;
    public artistImgUrl?: string | undefined;
    constructor(name: string, url: string, artistName: string, thumbnailUrl?: string, artistImgUrl?: string) {
        this.name = name;
        this.url = url;
        this.artistName = artistName;
        this.thumbnailUrl = thumbnailUrl;
        this.artistImgUrl = artistImgUrl;
    }
}
interface Artist {
    name: string;
    url: string;
}
const getLinkMp3Song = async (songId: string) => {
    const song = (await ZingMp3.getSong(songId)).data;
    const url = song["128"];
    return url;
};
const createTrackList = async (listId: string, fileName: string) => {
    const list = (await ZingMp3.getDetailPlaylist(listId)).data.song.items;
    const trackList: Track[] = [];
    for (let i = 0; i < list.length; i++) {
        try {
            const track = new Track(
                list[i].title,
                await getLinkMp3Song(list[i].encodeId),
                list[i].artistsNames,
                list[i].thumbnailM,
                list[i].artists[0].thumbnailM
            );
            track.id = list[i].encodeId;
            trackList.push(track);
        } catch (e) {
            // console.log(e);
            continue;
        }
    }
    fs.writeFileSync(fileName, JSON.stringify(trackList));
};

// createTrackList("ZWZB969E", "top100NhacTre.json");
// ZingMp3.getHome().then((data) => {
//     fs.writeFileSync("home.json", JSON.stringify(data.data));
// });
const getSongByArtist = async (artistId: string) => {
    const songList = (await ZingMp3.getArtist(artistId)).data.sections[0].items;
    const trackList: Track[] = [];
    for (let i = 0; i < songList.length; i++) {
        try {
            const track = new Track(
                songList[i].title,
                await getLinkMp3Song(songList[i].encodeId),
                songList[i].artistsNames,
                songList[i].thumbnailM,
                songList[i].artists[0].thumbnailM
            );
            track.id = songList[i].encodeId;
            trackList.push(track);
        } catch (e) {
            // console.log(e);
            continue;
        }
    }
    fs.writeFileSync("temp.json", JSON.stringify(trackList));
};
getSongByArtist("MONO-Nguyen-Viet-Hoang");
