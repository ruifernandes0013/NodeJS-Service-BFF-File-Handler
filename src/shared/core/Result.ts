export class Result<T> {
    private readonly _isSuccess: boolean;
    private readonly _isFailure: boolean;
    private readonly _value: T | undefined;
    public readonly error: T | string | undefined;

    get isSuccess(): boolean {
        return this._isSuccess;
    }

    get isFailure(): boolean {
        return this._isFailure;
    }

    public constructor(isSuccess: boolean, error?: T | string, value?: T) {
        if (isSuccess && error) {
            throw new Error('InvalidOperation: A result cannot be successful and contain an error');
        }
        if (!isSuccess && !error) {
            throw new Error('InvalidOperation: A failing result needs to contain an error message');
        }

        this._isSuccess = isSuccess;
        this._isFailure = !isSuccess;
        this.error = error;
        this._value = value;

        Object.freeze(this);
    }

    public getValue(): T {
        if (!this._isSuccess) {
            console.log(this.error);
            throw new Error(this.getErrorMessage());
        }

        if (this._value === undefined || this._value === null) {
            throw new Error('Result value is undefined');
        }

        return this._value;
    }

    public errorValue(): T {
        return this.error as T;
    }

    public getErrorMessage(): string {
        if (typeof this.error === 'string') {
            return this.error;
        }

        const message = (this.error as any).message;
        if (message) {
            return message;
        }

        return `Unknown error message`;
    }

    public static ok<U>(value?: U): Result<U> {
        return new Result<U>(true, undefined, value);
    }

    public static fail<U>(error: string): Result<U> {
        return new Result<U>(false, error);
    }

    public static combine(results: Result<any>[]): Result<any> {
        for (const result of results) {
            if (result.isFailure) {
                return result;
            }
        }
        return Result.ok();
    }

    public static isResult(arg: any): arg is Result<any> {
        return arg instanceof Result;
    }
}

export type Either<L, A> = Left<L, A> | Right<L, A>;

export class Left<L, A> {
    readonly value: L;

    constructor(value: L) {
        this.value = value;
    }

    isLeft(): this is Left<L, A> {
        return true;
    }

    isRight(): this is Right<L, A> {
        return false;
    }
}

export class Right<L, A> {
    readonly value: A;

    constructor(value: A) {
        this.value = value;
    }

    isLeft(): this is Left<L, A> {
        return false;
    }

    isRight(): this is Right<L, A> {
        return true;
    }
}

export const left = <L, A>(l: L): Either<L, A> => {
    return new Left(l);
};

export const right = <L, A>(a: A): Either<L, A> => {
    return new Right<L, A>(a);
};

export function throwLeftOnFailure<T>(result: Result<T>): T | never {
    if (result.isFailure) {
        throw left(result);
    }
    return result.getValue();
}
