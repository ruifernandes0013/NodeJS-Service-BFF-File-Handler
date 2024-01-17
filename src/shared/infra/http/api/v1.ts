import { Router } from 'express';
import { fileRouter } from '../../../../modules/File/infra/fileRouter';
import { healthouter } from '../../../../modules/Health/infra/healthRouter';

const v1AuthRouters: Router = Router();
v1AuthRouters.use('/file', fileRouter);
v1AuthRouters.use('/health', healthouter);
v1AuthRouters.get('/ping', (req, res) => res.send('pong'));

export { v1AuthRouters };
