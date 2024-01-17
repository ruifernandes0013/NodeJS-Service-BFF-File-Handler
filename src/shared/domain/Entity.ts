import {UniqueEntityID} from './UniqueEntityID';

export abstract class Entity<T> {
    protected readonly _id: UniqueEntityID;
    protected readonly props: T;
    public readonly isNew: boolean;

    get id(): UniqueEntityID {
        return this._id;
    }

    constructor(props: T, id?: UniqueEntityID) {
        this.isNew = !id;
        this._id = id ? id : UniqueEntityID.createNew();
        this.props = props;
    }

    public equals(object?: Entity<T>): boolean {
        const isEntity = (v: any): v is Entity<any> => {
            return v instanceof Entity;
        };

        if (object == null || object == undefined) {
            return false;
        }

        if (this === object) {
            return true;
        }

        if (!isEntity(object)) {
            return false;
        }

        return this._id.equals(object._id);
    }
}
