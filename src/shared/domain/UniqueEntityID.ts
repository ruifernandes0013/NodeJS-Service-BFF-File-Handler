import { v4 as uuid } from 'uuid';
import { Identifier } from './Identifier';

export class UniqueEntityID extends Identifier<string | number> {
    private constructor(id?: string | number) {
        super(id !== undefined && id !== null ? id : uuid());
    }

    public static createNew(): UniqueEntityID {
        return new UniqueEntityID();
    }

    public static createFromExisting(id: string): UniqueEntityID | never {
        if (!id) {
            throw new Error(`Cannot create existing UniqueEntityID. Provided value is undefined.`);
        }
        return new UniqueEntityID(id);
    }
}
