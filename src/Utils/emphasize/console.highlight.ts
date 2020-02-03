import { inRed, inGreen, inYellow, inBlue } from "./string.highlight";

function OK(text: any) {
    console.log(inGreen(text));
}

function Warn(text: any) {
    console.log(inYellow(text));
}

function Err(text: any) {
    console.log(inRed(text));
}

function Info(text: any) {
    console.log(inBlue(text));
}

export let Console = {
    OK,
    Warn,
    Err,
    Info
}