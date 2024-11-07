import { initMongoDB } from "./db/initMongoDB.js";
import { startServer } from "./server.js";

const boostrap = async()=> {
    await initMongoDB();
    startServer();
}

boostrap();

