import {config} from "dotenv";
import cors from "cors";
import DataConnection from './core/infrastructure/DataConnection';
const express = require('express');
const bodyParser = require('body-parser')

function setupEnv(){
    const env = config() || null;
    if(env.error){
        throw new Error("Couldn't file .env file");
    }
}

function setupServer() {
    console.log("Start API Server in environment " + process.env.NODE_ENV);

    DataConnection.init();

    let app = express();

    app.use(express.static('pages'))
    app.use(cors()) // or setup custom CORS in Configuration.ts
    app.use(bodyParser.json())

    //app.use(bodyParser.urlencoded({ extended: false }))

    let PORT = process.env.PORT || 3000;

    app.listen(PORT, () =>{
        console.log(`Server listening on port: ${PORT} ...`);
    });
}

function API(){
    try {
        setupEnv();
        setupServer();
    } catch (err) {
        console.error("Can't start API server ", err);
    }
}

API()