import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";


type Response = Either<AppError.UnexpectedError, Result<string>>;

export class UploadFileUseCase implements UseCase<void, Response> {
    constructor() { }

    async execute(): Promise<Response> {
        return right(Result.ok<string>('file'));
    }
}
