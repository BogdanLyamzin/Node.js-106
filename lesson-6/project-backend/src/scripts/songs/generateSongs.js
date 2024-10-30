import { createFakeSong } from "../../utils/songs/createFakeSong.js";
import { readSongs } from "../../utils/songs/readSongs.js";
import { writeSongs } from "../../utils/songs/writeSongs.js";

const generateSongs = async (number) => {
    const songs = await readSongs();
    const newSongs = Array(number).fill(0).map(createFakeSong);
    const result = [...songs, ...newSongs];
    await writeSongs(result);
};

generateSongs(5);
