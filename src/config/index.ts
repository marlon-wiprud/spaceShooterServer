export interface Config {
    authKey: string;
    port: string | number;
}

export const config: Config = {
    authKey: process.env.AUTH_KEY || "",
    port: process.env.PORT || 3000
}