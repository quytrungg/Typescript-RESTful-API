import Route from "../../routes/Routes";
import Log from "../logs/Log";
const bodyParser = require("body-parser");
const passport = require("passport");

export default class Configuration {
    static setupRouting() {
        Log.info("Start setup routing ");
        Log.info("Setup routing successfully");
    }

    static setupAuthentication(app: { use: any; }) {
        Log.info("Start setup Authentication");
        app.use(passport.initialize());
        Log.info("Start setup Authentication successfully");

    }

    static setup(app: { use: ((arg0: any) => void) | ((arg0: (req: { method: string; }, res: { header: (arg0: string, arg1: string) => void; status: (arg0: number) => { (): any; new(): any; end: { (): void; new(): any; }; }; }, next: () => void) => void) => void); }) {
        try {
            Configuration.setupExpress(app);
            Configuration.setupCORS(app);
            Configuration.setupAuthentication(app);
            Configuration.setupRouting();
        }
        catch (e) {
            Log.error("There is an error when starting server", e);

            throw e;
        }
    }


    static setupExpress(app: { use: (arg0: any) => void; }) {
        Log.info("Start setup Express");

        app.use(bodyParser.json({
            limit: "100mb"
        }));

        Log.info("Setup Express successfully");
    }

    static setupCORS(app: { use: (arg0: (req: { method: string; }, res: { header: (arg0: string, arg1: string) => void; status: (arg0: number) => { (): any; new(): any; end: { (): void; new(): any; }; }; }, next: () => void) => void) => void; }) {
        Log.info("Start setup CORS");

        app.use(function (req: { method: string; }, res: { header: (arg0: string, arg1: string) => void; status: (arg0: number) => { (): any; new(): any; end: { (): void; new(): any; }; }; }, next: () => void) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Nonce, Signature, Timestamp, No-Cache, Client-Request");
            res.header("Access-Control-Allow-Methods", "GET, PATCH, POST, DELETE");

            if ("OPTIONS" === req.method) {
                res.status(200).end();
            } else {
                next();
            }
        });

        Log.info("Setup CORS successfully");
    }
}
