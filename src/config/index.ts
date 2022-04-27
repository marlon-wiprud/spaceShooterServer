export interface Config {
    authKey: string;
}

export const config: Config = {
    authKey: process.env.AUTH_KEY || ""
}