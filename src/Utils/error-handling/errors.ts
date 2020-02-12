import { IError } from "@Interface/common";

class InvalidIndex implements IError {

    readonly name: string;
    readonly message: string;
    readonly stack?: string;

    constructor(message: string, name: string = "Invalid Index") {
        this.message = message;
        this.name = name;
    }
}

class InvalidArgument implements IError {

    readonly name: string;
    readonly message: string;
    readonly stack?: string;

    constructor(message: string, name: string = "Invalid Argument") {
        this.message = message;
        this.name = name;
    }
}

class InvalidDataType implements IError {

    readonly name: string;
    readonly message: string;
    readonly stack?: string;

    constructor(message: string, name: string = "Invalid Data Type") {
        this.message = message;
        this.name = name;
    }
}

class OutOfBoundary implements IError {

    readonly name: string;
    readonly message: string;
    readonly stack?: string;

    constructor(message: string, name: string = "Out of the Boundary") {
        this.message = message;
        this.name = name;
    }
}

class ELementNotExisted implements IError {

    readonly name: string;
    readonly message: string;
    readonly stack?: string;

    constructor(message: string, name: string = "Not Existed") {
        this.message = message;
        this.name = name;
    }
}

enum Msg {
    NoMoreSpace = 'Current Collection is Full!',
    InvalidArg = 'Arg cannot be Null, Undefined, NAN, INFINITY or Empty String!',
    InvalidIdx = 'Index should be safe INTEGER, both POSITIVE or NEGATIVE are acceptable!',
    NotANumber = 'is NOT a NUMBER',
    InvalidPath = 'Invalid path number, only 0 or 1 is acceptable',
    InvalidDataType = 'Invalid input of Data Type',
    InvalidDictKey = 'Visited Key does NOT exist',
    UnacceptablePrintOrder = "Print order is NOT acceptable",
    BeyondBoundary = 'Index is out of boundary',
    BeyondCapacity = 'Number Exceeds the Capacity',
    NotExisted = 'ELement to query does NOT exist',
    NoElements = 'No elements in current collection',
    NotSafeNum = 'is NOT SAFE',
    NotSafeInteger = 'is NOT an Integer, or it is But UNSAFE',
    NotPositiveInteger = 'is NOT a Positive Integer',
    BeyondLowerLimit = "It is less than Lower Limit",
    BeyondUppperLimit = "It is over Upper Limit",
    OverrideError = 'Cannot override the method which does NOT exist on its Parent Class'
}

export const Errors = {
    InvalidIndex,
    InvalidArgument,
    InvalidDataType,
    OutOfBoundary,
    ELementNotExisted,
    Msg
}