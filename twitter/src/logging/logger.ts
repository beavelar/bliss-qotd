import { LevelEnum } from "./LevelEnum";

export function logger(level: LevelEnum, message: string, error?: any): void {
  const date = new Date();
  if (level === LevelEnum.LOG) {
    console.log(`${date} | ${message}`); // `
  }
  else if (level === LevelEnum.ERROR) {
    if (error) {
      console.error(`${date} | ${message}`); // `
      console.error(error);
    }
    else {
      console.error(`${date} | ${message}`); // `
    }
  }
}