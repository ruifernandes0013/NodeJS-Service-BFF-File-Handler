import express, {Express} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {v1AuthRouters} from '../infra/http/api/v1';
import 'dotenv/config';

export class Server {
    private static app: Express;

    public static getServer(): Express {
        if (!Server.app) {
            const app = express();
            Server.app = app;

            try {
                app.use(bodyParser.json({limit: '15mb'}));
                app.use(bodyParser.urlencoded({limit: '15mb', extended: true}));
                app.use(cors({origin: '*', exposedHeaders: ['X-Total-Count', 'X-Access-Token']}));
                app.use('/api', v1AuthRouters);
            } catch (e) {
                console.log(e);
                throw e;
            }
        }
        return Server.app;
    }
}
