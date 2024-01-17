import 'dotenv/config';
import env from './env';
import { Server } from './shared/singleton/Server';

const app = Server.getServer();

app.listen(env.PORT, () => console.log(`APP LISTENING ON localhost:${env.PORT}/api`));
