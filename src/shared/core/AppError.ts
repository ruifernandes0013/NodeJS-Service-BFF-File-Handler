import { Result } from './Result';
import { UseCaseError } from './UseCaseError';

export namespace AppError {
    export class UnexpectedError extends Result<UseCaseError> {
        public constructor(err: any | string) {
            let message = '[AppError] An unexpected error occurred.';

            if (typeof err === 'string') {
                message = `[AppError]: ${err}`;
            } else if (err.message && err.message.length > 0) {
                message = `[AppError]: ${err.message}`;
            }

            super(false, {
                message,
                error: err,
            } as UseCaseError);
            console.log(`[AppError]: An unexpected error occurred`);
            console.error(err);
        }

        public static create(err: any): UnexpectedError {
            return new UnexpectedError(err);
        }
    }
}
