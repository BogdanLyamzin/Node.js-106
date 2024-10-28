import {Router} from "express";

import * as movieControllers from "../controllers/movies.js";

import ctrlWrapper from "../utils/ctrlWrapper.js";

const moviesRouter = Router();

moviesRouter.get("/", ctrlWrapper(movieControllers.getMoviesController));

moviesRouter.get("/:id", ctrlWrapper(movieControllers.getMovieByIdController));

export default moviesRouter;
