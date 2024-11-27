import { initMongoDB } from "./db/initMongoDB.js";
import { startServer } from "./server.js";
import { createDirIfNotExists } from "./utils/createDirIfNotExists.js";

import { TEMP_UPLOAD_DIR, UPLOADS_DIR } from "./constants/index.js";

const boostrap = async()=> {
    await initMongoDB();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOADS_DIR);
    startServer();
}

boostrap();

