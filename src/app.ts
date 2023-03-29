import express, {Request, Response} from 'express'

export const app = express()

// for read "body"
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('hello from videos api')
})

app.post('/',  (req: Request, res: Response) => {
    const body = req.body
    res.send(body)
})
