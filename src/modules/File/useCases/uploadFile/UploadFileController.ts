import { Request, Response } from 'express';
import { BaseController } from '../../../../shared/infra/http/models/BaseController';
import { UploadFileUseCase } from './UploadFileUseCase';

export class UploadFileController extends BaseController {
    constructor(private useCase: UploadFileUseCase) {
        super();
    }

    async executeImpl(req: Request, res: Response): Promise<any> {
        try {
            const result = await this.useCase.execute();

            if (result.isLeft()) {
                const error = result.value;
                return this.fail(req, res, error.getErrorMessage());
            }

            return this.ok(req, res, result.value.getValue());
        } catch (e: any) {
            return this.fail(req, res, e);
        }
    }
}
