
import chalk from "chalk";

function OK(text: any) {
    console.log(chalk.bgGreenBright.bold.redBright(text.toString()));
}

function Warn(text: any) {
    console.log(chalk.bgYellowBright.bold.redBright(text.toString()));
}

function Err(text: any) {
    console.log(chalk.bgRedBright.bold.whiteBright(text.toString()));
}

export let Console = {
    OK,
    Warn,
    Err
}