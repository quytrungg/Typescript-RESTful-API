import Mongoose = require("mongoose");
import Log from "../logs/Log";

export class  DataConnection {
    static dbInstance = Mongoose;
    static dbConnection = this.dbInstance.connection;

    static connect() {
        let connectionString = process.env.DATABASE_URL;

        Log.info("Start connecting to database " + connectionString);

        let connectOptions = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            connectTimeoutMS: 10000
        };

        return Mongoose.connect(connectionString, connectOptions, (err: any) => {
            if (err) {
                Log.error("Can't connect to database", err);
            }
        });
    }

    static init() {
        DataConnection.connect();

        this.dbConnection.on("connected", () => {
            Log.info("Connected to database successfully");
        });

        this.dbConnection.on("error", (err: any) => {
            Log.error("Error while connecting to database", err);
        });

        this.dbConnection.on("disconnected", () => {
            Log.error("Database disconnected");
            Log.info("Database try to reconnect, in progress at the moment, retrying...");
            DataConnection.connect();
        });
    }
}
