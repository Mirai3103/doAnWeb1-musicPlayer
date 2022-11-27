import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { Track } from ".";

cloudinary.config({
    cloud_name: "dkvga054t",
    api_key: "177378989858313",
    api_secret: "_YRUPuteY7KGo0DYOKN159GdvPs",
});

const upToCloudinary = async (filePath: string) => {
    try {
        const res = await cloudinary.uploader.upload(filePath, {
            resource_type: "video",
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            folder: "songs",
        });
        return res.secure_url;
    } catch (error) {
        console.log(error);
        return null;
    }
};
const songs: Track[] = JSON.parse(fs.readFileSync("./songs.json", "utf-8"));
let songsTrendingDay: Track[] = JSON.parse(fs.readFileSync("./tredingday.json", "utf-8"));
let songsTrendingMonth: Track[] = JSON.parse(fs.readFileSync("./tredingMonth.json", "utf-8"));
let songsTrendingWeek: Track[] = JSON.parse(fs.readFileSync("./tredingWeek.json", "utf-8"));
const renewSongUrl = async (song: Track) => {
    const url = await upToCloudinary(song.url);
    if (url) {
        song.url = url;
    } else {
        console.error(song.id);
    }
};
const main = async () => {
    for (let i = 0; i < songs.length; i++) {
        await renewSongUrl(songs[i]);
    }
    fs.writeFileSync("./songs2.json", JSON.stringify(songs));
};
// main().then(() => {
//     console.log("Done");
// });
const main2 = () => {
    for (const song of songs) {
        songsTrendingDay = songsTrendingDay.map((s) => {
            if (s.id === song.id) {
                s.url = song.url;
            }
            return s;
        });
        songsTrendingMonth = songsTrendingMonth.map((s) => {
            if (s.id === song.id) {
                s.url = song.url;
            }
            return s;
        });
        songsTrendingWeek = songsTrendingWeek.map((s) => {
            if (s.id === song.id) {
                s.url = song.url;
            }
            return s;
        });
    }
    fs.writeFileSync("./tredingDay.json", JSON.stringify(songsTrendingDay));
    fs.writeFileSync("./tredingMonth.json", JSON.stringify(songsTrendingMonth));
    fs.writeFileSync("./tredingWeek.json", JSON.stringify(songsTrendingWeek));
};
main2();
