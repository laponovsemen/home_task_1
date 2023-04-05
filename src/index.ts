import {testingRouter, videosRouter, checkRouter} from "./app";
import express from "express";

export const app = express()
const port = 5000


app.use(express.json())
app.use("", checkRouter)
app.use("", testingRouter)
app.use('/videos', videosRouter)
const startApp = () => {
    app.listen(port, () => {
        console.log(`App started at ${port} port`)
    })
}

startApp()
