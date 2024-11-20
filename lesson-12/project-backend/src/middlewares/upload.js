import multer from "multer";
import createHttpError from "http-errors";

import { TEMP_UPLOAD_DIR } from "../constants/index.js";

const storage = multer.diskStorage({
    // destination: (req, file, callback)=> {
    //     callback(null, TEMP_UPLOAD_DIR);
    // },
    destination: TEMP_UPLOAD_DIR,
    filename: (req, file, callback)=> {
        const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
        const filename = `${uniquePrefix}_${file.originalname}`;
        callback(null, filename);
    }
});

const limits = {
    fileSize: 1024 * 1024 * 5,
}

const fileFilter = (req, file, callback)=> {
    const extension = file.originalname.split(".").pop();
    if(extension === "exe") {
        return callback(createHttpError(400, ".exe extension not allow"));
    }
    callback(null, true);
}

export const upload = multer({
    storage,
    limits,
    fileFilter,
})
