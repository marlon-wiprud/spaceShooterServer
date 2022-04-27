import { newServer } from "./server"

const app = newServer()

app.listen(3001, () => {
    console.log("listening...")
})