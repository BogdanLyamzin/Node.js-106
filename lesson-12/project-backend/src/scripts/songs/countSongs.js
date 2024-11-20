import {readSongs} from "../../utils/songs/readSongs.js";

export const countSongs = async ()=> {
    const songs = await readSongs();
    return songs.length;
};

console.log(await countSongs());
