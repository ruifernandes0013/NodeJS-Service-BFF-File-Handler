import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import os from 'os';
import { Utils } from "../../../../shared/utils/Utils";
import { Health } from "../../domain/Health";

type Response = Either<AppError.UnexpectedError, Result<Health>>;

export class GetHealthUseCase implements UseCase<void, Response> {
    constructor() { }

    async execute(): Promise<Response> {
        const freeMemory = Utils.bytesToGigabytes(os.freemem());
        const totalMemory = Utils.bytesToGigabytes(os.totalmem());
        const usedMemory = Utils.bytesToGigabytes(totalMemory - freeMemory);
        const cpuLoad = os.loadavg(); // This gives an array of 1, 5, and 15 minutes load averages

        const healthOrError = Health.create({
            uptime: os.uptime(), // system uptime in seconds
            freeMemory, // free memory in bytes
            usedMemory, // used memory in bytes
            totalMemory, // total memory in bytes
            cpuLoad, // load average information
            cores: os.cpus().length, // number of CPU cores
        });
        if (healthOrError.isFailure) {
            return left(new AppError.UnexpectedError(healthOrError));
        }

        const health = healthOrError.getValue()
        return right(Result.ok<Health>(health));
    }
}
