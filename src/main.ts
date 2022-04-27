import { config } from "./config"
import { newServer } from "./server"

const app = newServer()

app.listen(config.port, () => {
    console.log("listening on port ",)
})