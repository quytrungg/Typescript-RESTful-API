import Mongoose = require("mongoose")

export default class DataConnection {
    static dbInstance = Mongoose;
    static dbConnection = this.dbInstance.connection;

    static connect() {
        let connectionString = process.env.DATABASE_URL;

        console.log("Start connecting to database " + connectionString);

        let connectOptions = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            connectTimeoutMS: 10000
        };

        return Mongoose.connect(connectionString, connectOptions, (err: any) => {
            if (err) {
                console.error("Can't connect to database", err);
            }
        });
    }

    static init() {
        DataConnection.connect();

        this.dbConnection.on("connected", () => {
            console.log("Connected to database successfully");
        });

        this.dbConnection.on("error", (err: any) => {
            console.error("Error while connecting to database", err);
        });

        this.dbConnection.on("disconnected", () => {
            console.error("Database disconnected");
            console.log("Database try to reconnect, in progress at the moment, retrying...");
            DataConnection.connect();
        });
    }
}
