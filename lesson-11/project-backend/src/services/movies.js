import MovieCollection from "../db/models/Movie.js";

import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getMovies = async ({page = 1, perPage = 10, sortBy = "_id", sortOrder = "asc", filter = {}})=> {
    const query = MovieCollection.find();

    if(filter.minReleaseYear) {
        query.where("releaseYear").gte(filter.minReleaseYear);
    }
    if(filter.maxReleaseYear) {
        query.where("releaseYear").lte(filter.maxReleaseYear);
    }
    if(filter.userId) {
        query.where("userId").equals(filter.userId);
    }

    const totalItems = await MovieCollection.find().merge(query).countDocuments();

    const skip = (page - 1) * perPage;
    const data = await query.skip(skip).limit(perPage).sort({[sortBy]: sortOrder});;

    const paginationData = calculatePaginationData({totalItems, page, perPage});

    return {
        data,
        ...paginationData,
    };
};

export const getMovieById = id => MovieCollection.findById(id);

export const addMovie = payload => MovieCollection.create(payload);

export const updateMovie = async ({_id, payload, options = {}}) => {
    const rawResult = await MovieCollection.findOneAndUpdate({_id}, payload, {
        ...options,
        includeResultMetadata: true,
    });

    if(!rawResult || !rawResult.value) return null;

    return {
        data: rawResult.value,
        isNew: Boolean(rawResult.lastErrorObject.upserted)
    }
}

export const deleteMovie = filter => MovieCollection.findOneAndDelete(filter);
