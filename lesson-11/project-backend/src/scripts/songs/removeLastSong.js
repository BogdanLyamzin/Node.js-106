import {readSongs} from "../../utils/songs/readSongs.js";
import {writeSongs} from "../../utils/songs/writeSongs.js";

const removeLastSong = async ()=> {
    const songs = await readSongs();
    songs.pop();
    await writeSongs(songs);
};

removeLastSong();
