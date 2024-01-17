import { Router } from "express";
import { getHealthController } from "../useCases/getHealth";

const healthouter: Router = Router()
healthouter.get('/', (req, res) => getHealthController.execute(req, res))

export { healthouter }