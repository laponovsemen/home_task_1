import app from "./app";

const port = 3001

const startApp = () => {
    app.listen(port, () => {
        console.log(`App started at ${port} port`)
    })
}

startApp()

export default app