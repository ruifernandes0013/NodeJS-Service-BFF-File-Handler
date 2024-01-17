import { UploadFileController } from "./UploadFileController";
import { UploadFileUseCase } from "./UploadFileUseCase";

const uploadFileUseCase = new UploadFileUseCase();
const uploadFileController = new UploadFileController(uploadFileUseCase);

export { uploadFileController };
