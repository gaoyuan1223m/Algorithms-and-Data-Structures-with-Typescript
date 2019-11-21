import { IError } from "@Interface/common/IError";

export class InvalidIndexOrArg implements IError {

    readonly name: string;
    readonly message: string;
    readonly stack?: string;

    constructor(message: string, name?: string) {
        this.message = message;
        this.name = name;
    }

}

export class OutOfBoundary implements IError {

    readonly name: string;
    readonly message: string;
    readonly stack?: string;

    constructor(message: string, name?: string ) {
        this.message = message;
        this.name = name;
    }
}

export class ELementNotExisted implements IError {

    readonly name: string;
    readonly message: string;
    readonly stack?: string;

    constructor(message: string, name?: string) {
        this.message = message;
        this.name = name;
    }
}

export enum Msg {
    NoMoreSpace = 'Current Collection is Full',
    InValidArg = 'Arg or Index is INVALID',
    ShouldBeInteger = 'Index should be INTEGER',
    NotExisted = 'ELement queried doesn\'t exist' 
}