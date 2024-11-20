import {Schema, model} from "mongoose";

import { handleSaveError, setUpdateSettings } from "./hooks.js";

import { typeList } from "../../constants/movies.js";

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: typeList,
        default: "film",
        required: true,
    },
    releaseYear: {
        type: Number,
        min: 1885,
        required: true,
    },
    poster: {
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
}, {versionKey: false, timestamps: true});

movieSchema.post("save", handleSaveError);

movieSchema.pre("findOneAndUpdate", setUpdateSettings);

movieSchema.post("findOneAndUpdate", handleSaveError);

export const sortByList = ["title", "director", "type"];

const MovieCollection = model("movie", movieSchema);

export default MovieCollection;
