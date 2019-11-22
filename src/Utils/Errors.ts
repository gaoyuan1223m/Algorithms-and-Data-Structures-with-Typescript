import { IError } from "@Interface/common/IError";

class InvalidIndex implements IError {

    readonly name: string;
    readonly message: string;
    readonly stack?: string;

    constructor(message: string, name?: string) {
        this.message = message;
        this.name = name;
    }

}

class InvalidArgument implements IError {

    readonly name: string;
    readonly message: string;
    readonly stack?: string;

    constructor(message: string, name?: string) {
        this.message = message;
        this.name = name;
    }

}

class OutOfBoundary implements IError {

    readonly name: string;
    readonly message: string;
    readonly stack?: string;

    constructor(message: string, name?: string ) {
        this.message = message;
        this.name = name;
    }
}

class ELementNotExisted implements IError {

    readonly name: string;
    readonly message: string;
    readonly stack?: string;

    constructor(message: string, name?: string) {
        this.message = message;
        this.name = name;
    }
}

enum Msg {
    NoMoreSpace = 'Current Collection is Full!',
    InValidArg = 'Arg cannot be Null, Undefined, or NAN!',
    InValidIdx = 'Index should be INTEGER, both POSITIVE or NEGATIVE are acceptable!',
    BeyondBoundary = 'Index is out of boundary',
    NotExisted = 'ELement queried doesn\'t exist' 
}

export const Errors = {
    InvalidIndex,
    InvalidArgument,
    OutOfBoundary,
    ELementNotExisted,
    Msg
}