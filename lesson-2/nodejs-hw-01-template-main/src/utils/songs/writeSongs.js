import {writeFile} from "node:fs/promises";

import { PATH_DB_SONGS } from "../../constants/songs.js";

export const writeSongs = songs => writeFile(PATH_DB_SONGS, JSON.stringify(songs, null, 2));
