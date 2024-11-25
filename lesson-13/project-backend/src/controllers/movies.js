import createHttpError from "http-errors";
import * as path from "node:path";

import * as movieServices from "../services/movies.js";

import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseMovieFilterParams } from "../utils/parseMovieFilterParams.js";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import {env} from "../utils/env.js";

import { sortByList } from "../db/models/Movie.js";

const enableCloudinary = env("ENABLE_CLOUDINARY");

export const getMoviesController = async (req, res)=> {
    const {page, perPage} = parsePaginationParams(req.query);
    const {sortBy, sortOrder} = parseSortParams(req.query, sortByList);
    const filter = parseMovieFilterParams(req.query);
    const {_id: userId} = req.user;
    filter.userId = userId;

    const data = await movieServices.getMovies({page, perPage, sortBy, sortOrder, filter});

    res.json({
        status: 200,
        message: "Successfully find movies",
        data,
    })
}

export const getMovieByIdController = async(req, res)=> {
    const {id} = req.params;
    const data = await movieServices.getMovieById(id);

    if(!data) {
        throw createHttpError(404, `Movie with id=${id} not found`);
    }

    res.json({
        status: 200,
        message: `Movie successfully find`,
        data,
    })
}

export const addMovieController = async(req, res)=> {
    const {_id: userId} = req.user;
    let poster = null;
    if(req.file) {
        if(enableCloudinary === "true") {
            poster = await saveFileToCloudinary(req.file, "posters");
        }
        else {
            await saveFileToUploadDir(req.file);
            poster = path.join(req.file.filename);
        }
    }

    const data = await movieServices.addMovie({...req.body, poster, userId});

    res.status(201).json({
        status: 201,
        message: "Movie successfullt added",
        data,
    });
}

export const upsertMovieController = async(req, res)=> {
    const {id: _id} = req.params;

    const result = await movieServices.updateMovie({_id, payload: req.body, options: {
        upsert: true
    }});

    const status = result.isNew ? 201 : 200;

    res.status(status).json({
        status,
        message: "Movie upserted successfully",
        data: result.data,
    })
}

export const patchMovieController = async(req, res)=> {
    const {id: _id} = req.params;

    const result = await movieServices.updateMovie({_id, payload: req.body});

    if(!result) {
        throw createHttpError(404, `Movie with id=${_id} not found`);
    }

    res.json({
        status: 200,
        message: "Movie patched successfully",
        data: result.data,
    })

}

export const deleteMovieController = async(req, res)=> {
    const {id: _id} = req.params;

    const data = await movieServices.deleteMovie({_id});

    if(!data) {
        throw createHttpError(404, `Movie with id=${_id} not found`);
    }

    res.status(204).send();
}
