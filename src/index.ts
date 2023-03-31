import {router} from "./app";
import express from "express";

export const app = express()
const port = 3001


app.use(express.json())

app.use('/', router)

const startApp = () => {
    app.listen(port, () => {
        console.log(`App started at ${port} port`)
    })
}

startApp()

export default app