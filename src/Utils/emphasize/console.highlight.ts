import { inRed, inGreen, inYellow } from "./string.highlight";

function OK(text: any) {
    console.log(inGreen(text));
}

function Warn(text: any) {
    console.log(inYellow(text));
}

function Err(text: any) {
    console.log(inRed(text));
}

export let Console = {
    OK,
    Warn,
    Err
}