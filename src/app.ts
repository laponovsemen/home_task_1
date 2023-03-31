import express, {Request, Response, Router} from 'express'
// http
// req, res
// get | post | put | delete | patch

let videos: Array<VideoType> = []


// for read "body"
export const router = Router({})

router.get('/', (req: Request, res: Response) => {
    res.send('hello from videos api')
})
router.delete("/all-data", (req: Request, res: Response) => {
    videos = []
    const answer = "success response"
    res.sendStatus(204)
    res.send(answer)

})
router.post('/api/videos', (req: Request, res: Response) => {
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
