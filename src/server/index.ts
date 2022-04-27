import express from "express"
import cors from "cors"
import { handleGenerateNonce, handleLogin } from "./handlers"
import { middlewareVerifyAuth } from "./middleware"



const newRouter = () => {
    const r = express.Router({})
    r.use(express.json())
    r.use(cors())
    return r
}

export const newServer = () => {

    const app = express()

    const openRouterV1 = newRouter()
    const authRouterV1 = newRouter()
    authRouterV1.use(middlewareVerifyAuth)

    openRouterV1.post("/loginNonce", handleGenerateNonce)
    openRouterV1.post("/login", handleLogin)

    app.use("/v1", openRouterV1)
    app.use("/v1", authRouterV1)


    return app
}

