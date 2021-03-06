export interface Config {
    authKey: string;
    port: string | number;
}

export const config: Config = {
    authKey: process.env.AUTH_KEY || "abc123",
    port: process.env.PORT || 3001
}