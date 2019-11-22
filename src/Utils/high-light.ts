
import chalk from "chalk";

const OK = (text: any) => console.log(chalk.bgGreenBright.bold.redBright(text.toString()));

const Warn = (text: any) => console.log(chalk.bgYellowBright.bold.redBright(text.toString()));

const Err = (text: any) => console.log(chalk.bgRedBright.bold.whiteBright(text.toString()));

export let Console = {
    OK,
    Warn,
    Err
}