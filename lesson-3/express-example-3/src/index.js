import express from "express";
import cors from "cors";
import pino from "pino-http";

import movies from "./db/movies.js";

const app = express();

app.use(cors());
const logger = pino({
    transport: {
        target: "pino-pretty"
    }
});
// app.use(logger);
// const corsMiddleware = cors();
// app.use(corsMiddleware);

/*
const cors = options => {
    const func = (req, res, next)=> {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        );
        res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
        );
        res.setHeader("Access-Control-Allow-Credentials", true);
        next();
    }
    return func;
}
*/
// app.use((req, res, next)=> {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//     );
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "X-Requested-With,content-type"
//     );
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     next();
// })

// app.use((req, res, next)=> {
//     console.log("First middlewware");
//     next();
// });

// app.use((req, res, next)=> {
//     console.log("Second middlewware");
//     next();
// });

app.get("/products", (req, res)=> {
    res.json([]);
})

app.get("/movies", (req, res)=> {
    res.json(movies);
})

app.use((req, res)=> {
    res.status(404).json({
        message: `${req.url} not found`
    });
})

app.listen(3000, ()=> console.log("Server running on 3000 port"))