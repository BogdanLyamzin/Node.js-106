import express from "express";

import movies from "./db/movies.js";

const app = express();

// app.set("json spaces", 4);

app.get("/movies", (_, res)=> {
    const databaseResponse = null;
    // res.json(databaseResponse);
    // res.send(databaseResponse);
    res.json(movies);
    // res.send(movies);
})

app.listen(3000, ()=> console.log("Web-server running successfully on 3000 port"));