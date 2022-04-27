export class InvalidAuthToken extends Error {
    userMessage: string
    constructor(message: string) {
        super(message);
        this.message = message;
        this.userMessage = "failed to verify authentication token"
        this.name = "InvalidAuthToken";
        Object.setPrototypeOf(this, InvalidAuthToken.prototype);
    }
}
