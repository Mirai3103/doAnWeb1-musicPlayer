export class Track {
    public id: string = "";
    public name: string;
    public url: string;
    public artistName: string;
    public genre?: string | undefined;
    public thumbnailUrl?: string | undefined;
    public artistImgUrl?: string | undefined;
    public totalTime: number = 0;
    constructor(name: string, url: string, artistName: string, thumbnailUrl?: string, artistImgUrl?: string) {
        this.name = name;
        this.url = url;
        this.artistName = artistName;
        this.thumbnailUrl = thumbnailUrl;
        this.artistImgUrl = artistImgUrl;
    }
}
import fs from "fs";
import axios from "axios";
import mp3d from "mp3d";
import { ZingMp3 } from "zingmp3-api-full";
const songs: Track[] = JSON.parse(fs.readFileSync("./songs.json", "utf-8"));
const errorIds: string[] = [];
const isValidUrl = async (url: string) => {
    try {
        const res = await axios.get(url);
        return true;
    } catch (error) {
        return false;
    }
};
const getLinkMp3Song = async (songId: string) => {
    const song = (await ZingMp3.getSong(songId)).data;
    const url = song["128"];
    return url;
};
const renewSongUrl = async (song: Track) => {
    if (await isValidUrl(song.url)) {
        return;
    }
    const url = await getLinkMp3Song(song.id);
    song.url = url;
};
const main = async () => {
    for (let i = 0; i < songs.length; i++) {
        await renewSongUrl(songs[i]);
    }
    fs.writeFileSync("./songs2.json", JSON.stringify(songs));
};
// main();
console.log(songs.length);
