import express from "express";
import cors from "cors";
import pino from "pino-http";

import { env } from "./utils/env.js";

export const startServer = ()=> {
    const app = express();

    app.use(cors());
    const logger = pino({
        transport: {
            target: "pino-pretty"
        }
    });
    // app.use(logger);

    app.get("/", (req, res)=> {
        res.json({
            message: "Start project"
        })
    });

    app.use((req, res)=> {
        res.status(404).json({
            message: `${req.url} not found`
        })
    });

    app.use((error, req, res, next)=> {
        res.status(500).json({
            message: error.message,
        })
    });

    const port = Number(env("PORT", 3000));

    app.listen(port, ()=> console.log(`Server running on ${port} PORT`));
}
