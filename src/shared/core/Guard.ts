export interface IGuardSuccessfulResult {
    succeeded: true;
}

export interface IGuardFailureResult {
    succeeded: false;
    message: string;
}

export type IGuardResult = IGuardSuccessfulResult | IGuardFailureResult;

export interface IGuardArgument {
    argument: any;
    argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

export class Guard {
    public static combine(guardResults: IGuardResult[]): IGuardResult {
        for (const result of guardResults) {
            if (!result.succeeded) return result;
        }

        return {succeeded: true};
    }

    public static greaterThan(minValue: number, actualValue: number): IGuardResult {
        return actualValue > minValue
            ? {succeeded: true}
            : {
                  succeeded: false,
                  message: `Number given {${actualValue}} is not greater than {${minValue}}`,
              };
    }

    public static againstAtLeast(numChars: number, text: string): IGuardResult {
        return text.length >= numChars
            ? {succeeded: true}
            : {
                  succeeded: false,
                  message: `Text is not at least ${numChars} chars.`,
              };
    }

    public static againstAtMost(numChars: number, text: string): IGuardResult {
        return text.length <= numChars
            ? {succeeded: true}
            : {
                  succeeded: false,
                  message: `Text is greater than ${numChars} chars.`,
              };
    }

    public static againstNullOrUndefined(argument: any, argumentName: string): IGuardResult {
        if (argument === null || argument === undefined) {
            return {
                succeeded: false,
                message: `${argumentName} is null or undefined`,
            };
        } else {
            return {succeeded: true};
        }
    }

    public static againstNullOrUndefinedBulk(args: GuardArgumentCollection): IGuardResult {
        for (const arg of args) {
            const result = this.againstNullOrUndefined(arg.argument, arg.argumentName);
            if (!result.succeeded) {
                return result;
            }
        }

        return {succeeded: true};
    }

    public static againstNumbersInString(text: string): IGuardResult {
        const result = /[0-9]+/.test(text);
        if (result) {
            return {
                succeeded: false,
                message: `Provided /${text}/ can´t contain digits`,
            };
        }
        return {succeeded: true};
    }

    public static againstSpecialCharactersInString(text: string): IGuardResult {
        const format = /[`!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/;
        const result = format.test(text);

        if (result) {
            return {
                succeeded: false,
                message: `The ${text} can´t contain special characters.`,
            };
        }

        return {succeeded: true};
    }

    public static againstAtLeastOneLetter(text: string): IGuardResult {
        return /[a-zA-Z]/.test(text)
            ? {succeeded: true}
            : {
                  succeeded: false,
                  message: `Text does not contain at least one letter.`,
              };
    }

    public static againstNotSupportedCharacters(text: string): IGuardResult {
        const result = /[^\\A-zÀ-úłțŁ!\-ºª/@#$%^&*(),.?":0-9\s]/.test(text);

        if (result) {
            return {
                succeeded: false,
                message: `The fields only accept en or pt alphabetic.`,
            };
        }
        return {succeeded: true};
    }

    public static isOneOf(value: any, validValues: any[], argumentName: string): IGuardResult {
        let isValid = false;
        for (const validValue of validValues) {
            if (value === validValue) {
                isValid = true;
            }
        }

        if (isValid) {
            return {succeeded: true};
        } else {
            return {
                succeeded: false,
                message: `${argumentName} isn't oneOf the correct types in ${JSON.stringify(
                    validValues
                )}. Got "${value}".`,
            };
        }
    }

    public static inRange(num: number, min: number, max: number, argumentName: string): IGuardResult {
        const isInRange = num >= min && num <= max;
        if (!isInRange) {
            return {
                succeeded: false,
                message: `${argumentName} is not within range ${min} to ${max}.`,
            };
        } else {
            return {succeeded: true};
        }
    }
}
