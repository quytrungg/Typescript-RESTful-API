import {config} from "dotenv";
import cors from "cors";
import Configuration from "./core/middleware/Configuration";
import { DataConnection } from "./core/infrastructure/DataConnection";
import Log from "./core/logs/Log";
const express = require('express');
const bodyParser = require('body-parser')

function setupEnv(){
    const env = config() || null;
    if(env.error){
        throw new Error("Couldn't file .env file");
    }
}

function setupServer() {
    Log.info("Start API Server in environment " + process.env.NODE_ENV);

    DataConnection.init();

    let app = express();

    app.use(express.static('pages'))
    app.use(bodyParser.json())
    app.use(cors()) 
    // Configuration.setup(app);

    //app.use(bodyParser.urlencoded({ extended: false }))

    let PORT = process.env.PORT || 3000;

    app.listen(PORT, () =>{
        Log.info(`Server listening on port: ${PORT} ...`);
    });
}

function callAPI(){
    try {
        setupEnv();
        setupServer();
    } catch (err) {
        Log.error("Can't start API server ", err);
    }
}

callAPI()