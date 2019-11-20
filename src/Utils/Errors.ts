import { IError } from "@Interface/common/IError";

export class InvalidIndexOrArg implements IError {

    readonly name: string;
    readonly message: string;
    readonly stack?: string;

    constructor(message: string, name: string = `Invalid input index or argument`) {
        this.message = message;
        this.name = name;
    }

}

export class OutOfBoundary implements IError {

    readonly name: string;
    readonly message: string;
    readonly stack?: string;

    constructor(message: string, name: string = `Out of boundary of the current Collection`) {
        this.message = message;
        this.name = name;
    }
}

export class ELementNotExisted implements IError {

    readonly name: string;
    readonly message: string;
    readonly stack?: string;

    constructor(message: string, name: string = `Element you query doesn't exist`) {
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