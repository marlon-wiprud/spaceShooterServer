import { RequestHandler } from "express";
import { verifyJwt } from "../auth";
import { InvalidAuthToken } from "../auth/error";
import { buildErrorResponse } from "./error";

export const middlewareVerifyAuth: RequestHandler = (req, res, next) => {
    try {

        const { Authorization } = req.headers

        if (!Authorization) {
            throw new InvalidAuthToken("no authToken provided")
        }

        if (typeof Authorization != "string") {
            throw new InvalidAuthToken("authToken must be a valid string")
        }

        const data = verifyJwt(Authorization)
        res.locals.authData = data
        next()
    } catch (err) {
        res.status(401)
        res.json(buildErrorResponse(err))
    }

}