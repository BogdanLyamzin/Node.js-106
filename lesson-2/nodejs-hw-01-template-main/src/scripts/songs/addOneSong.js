import {createFakeSong} from "../../utils/songs/createFakeSong.js";
import {readSongs} from "../../utils/songs/readSongs.js";
import {writeSongs} from "../../utils/songs/writeSongs.js";

export const addOneSong = async ()=> {
    const songs = await readSongs();
    const newSong = createFakeSong();
    await writeSongs([...songs, newSong]);
};

addOneSong();
