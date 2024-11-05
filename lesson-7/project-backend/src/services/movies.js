import MovieCollection from "../db/models/Movie.js";

export const getMovies = ()=> MovieCollection.find();

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
