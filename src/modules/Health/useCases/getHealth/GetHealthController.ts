import { Request, Response } from 'express';
import { BaseController } from '../../../../shared/infra/http/models/BaseController';
import { GetHealthUseCase } from './GetHealthUseCase';
import { HealthMap } from '../../mappers/HealthMap';

export class GetHealthController extends BaseController {
    constructor(private useCase: GetHealthUseCase) {
        super();
    }

    async executeImpl(req: Request, res: Response): Promise<any> {
        try {
            const result = await this.useCase.execute();

            if (result.isLeft()) {
                const error = result.value;
                return this.fail(req, res, error.getErrorMessage());
            }
            const healthDTO = HealthMap.toDTO(result.value.getValue())

            return this.ok(req, res, healthDTO);
        } catch (e: any) {
            return this.fail(req, res, e);
        }
    }
}
