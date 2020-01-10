import chalk from "chalk";

export const OK = (text: any) => chalk.greenBright(text.toString());

export const Warn = (text: any) => chalk.yellowBright(text.toString());

export const Err = (text: any) => chalk.redBright(text.toString());
