class Track {
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
const songs: Track[] = JSON.parse(fs.readFileSync("./songs.json", "utf-8"));
const errorIds: string[] = [];
const getTotalTime = async (song: Track) => {
    // download file
    const file = await axios.get(song.url, { responseType: "stream" });
    const writer = fs.createWriteStream("./temp/" + song.id + ".mp3");
    file.data.pipe(writer);
    await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
    });
    // get duration
    const duration = await mp3d("./temp/" + song.id + ".mp3");
    // delete file
    fs.unlinkSync("./temp/" + song.id + ".mp3");
    song.totalTime = duration;
};
const main = async () => {
    const random20 = songs.sort(() => Math.random() - 0.5).slice(0, 20);
    fs.writeFileSync("./random20.json", JSON.stringify(random20, null, 4));
};
main();
