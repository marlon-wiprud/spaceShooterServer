import { initializeAuth, setScore, verifyAuth } from "../auth"
import { RequestHandler } from "express"
import { buildErrorResponse } from "./error"

export const handleGenerateNonce: RequestHandler = (req, res) => {
    try {
        const { address } = req.body
        const nonce = initializeAuth(address)
        res.json({ nonce })

    } catch (err) {
        res.status(400)
        res.json(buildErrorResponse(err))

    }
}

export const handleLogin: RequestHandler = (req, res) => {
    const { address, signature } = req.body
    try {

        if (!address) throw new Error("please provide address")
        if (!signature) throw new Error("please provide signature")

        const authToken = verifyAuth(address, signature)
        res.json({ authToken })

    } catch (err) {
        res.status(401)
        res.json(buildErrorResponse(err))
    }
}

export const handleSetScore: RequestHandler = (req, res) => {
    const { address, score } = req.body

    try {
        if (!address) throw new Error("please provide address")
        if (!score) throw new Error("please provide score")

        setScore(address, score)
        res.status(200)
        res.json({ success: true })
    } catch (err) {
        res.status(400)
        res.json(buildErrorResponse(err))
    }
}

export const handleGetScores: RequestHandler = (req, res) => {
    const { address, score } = req.body

    try {
        if (!address) throw new Error("please provide address")
        if (!score) throw new Error("please provide score")

        setScore(address, score)
        res.status(200)
        res.json({ success: true })
    } catch (err) {
        res.status(400)
        res.json(buildErrorResponse(err))
    }
}

