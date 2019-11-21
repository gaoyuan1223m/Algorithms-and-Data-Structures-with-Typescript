import { IError } from "@Interface/common/IError";

export class InvalidIndex implements IError {

    readonly name: string;
    readonly message: string;
    readonly stack?: string;

    constructor(message: string, name?: string) {
        this.message = message;
        this.name = name;
    }

}

export class InvalidArgument implements IError {

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
    NoMoreSpace = 'Current Collection is Full!',
    InValidArg = 'Arg cannot be Null, Undefined, or NAN!',
    InValidIdx = 'Index should be INTEGER, both POSITIVE or NEGATIVE are acceptable!',
    BeyondBoundary = 'Index is out of boundary',
    NotExisted = 'ELement queried doesn\'t exist' 
}