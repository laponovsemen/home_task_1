import {testingRouter, videosRouter, checkRouter} from "./app";
import express from "express";

export const app = express()
const port = 3001


app.use(express.json())
app.use("/", checkRouter)
app.use('/ht_01/api', testingRouter)
app.use('/videos', videosRouter)
const startApp = () => {
    app.listen(port, () => {
        console.log(`App started at ${port} port`)
    })
}

startApp()
