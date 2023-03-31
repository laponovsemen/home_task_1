import express, {Request, Response} from 'express'
// http
// req, res
// get | post | put | delete | patch

let videos: Array<VideoType> = []

export const app = express()

// for read "body"
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('hello from videos api')
})
app.delete("/testing/all-data", (req: Request, res: Response) => {
    videos = []
    const answer = "success response"
    res.sendStatus(204)
    res.send(answer)

})
app.post('/hometask_01/api/videos', (req: Request, res: Response) => {
    const title : string = req.body.title
    const author : string = req.body.author
    const availableResolutions = req.body.availableResolutions
    const newVideo: VideoType = {
        "title": title,
        "author": author,
        "availableResolutions" : availableResolutions
    }
    videos.push(newVideo)
    res.send(newVideo)
})

export default app