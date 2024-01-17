import { Router } from "express";
import { uploadFileController } from "../useCases/uploadFile";

const fileRouter: Router = Router()
fileRouter.post('/', (req, res) => uploadFileController.execute(req, res))

export { fileRouter }