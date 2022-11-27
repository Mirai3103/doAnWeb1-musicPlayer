import fs from "fs";
import { Track } from ".";
const songs: Track[] = JSON.parse(fs.readFileSync("./songs.json", "utf-8"));

// remove duplicate songs
const newSongs: Track[] = [];
for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    if (newSongs.find((s) => s.id === song.id)) {
        continue;
    }
    newSongs.push(song);
}

// write to file
fs.writeFileSync("./songs2.json", JSON.stringify(newSongs));
