import chalk from "chalk";

export const inRed = (text: any) => chalk.redBright(text.toString());

export const inGreen = (text: any) => chalk.greenBright(text.toString());

export const inYellow = (text: any) => chalk.yellowBright(text.toString());

export const inBlue = (text: any) => chalk.blueBright(text.toString());

export const inBlack = (text: any) => chalk.blackBright.bgBlack(text.toString());
