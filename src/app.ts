import {Request, Response, Router} from 'express'
import {app} from "./index"
import {constants} from "http2";

// http
// req, res
// get | post | put | delete | patch


let videos: Array<VideoType> = []
videos.push({
    "id": 0,
    "title": "string",
    "author": "string",
    "canBeDownloaded": true,
    "minAgeRestriction": null,
    "createdAt": "2023-04-01T07:20:22.049Z",
    "publicationDate": "2023-04-01T07:20:22.049Z",
    "availableResolutions": [
        "P144"
    ]
})

// for read "body"
export const checkRouter = Router({})
export const testingRouter = Router({})
export const videosRouter = Router({})
checkRouter.get('', (req: Request, res: Response) => {
    res.json({"key" : 'hello from videos api'})
    res.sendStatus(200)
})
testingRouter.delete("/testing/all-data", (req: Request, res: Response) => {
    videos.splice(0, videos.length - 1)
    res.sendStatus(204)
    return


})
videosRouter.get('', (req: Request, res: Response) => {
    res.status(204).json(videos)
})
videosRouter.post('', (req: Request, res: Response) => {
    const videoId = videos.length
    const newlyCreatedVideo : VideoType = {

        title  : req.body.title,
        author : req.body.author,
        availableResolutions : req.body.availableResolutions
    }
    videos.push(newlyCreatedVideo)
    res.status(201).send(newlyCreatedVideo)



})

videosRouter.get('/:id', (req: Request, res: Response) => {
    if (req.params.id === undefined){
        res.sendStatus(404)
        return
    }
    let videoId : number = +req.params.id
    for(let i = 0; i < videos.length; i++){
        if (videos[i].id === videoId){
            res.status(200)
            res.send(videos[i])
            return
        }
    }
    res.status(404)
})
videosRouter.put('/:id', (req: Request, res: Response) => {
    if (req.params.id === undefined){
        res.sendStatus(404)
        return
    }
    let videoId : number = +req.params.id

    for(let i = 0; i < videos.length; i++){
        if (videos[i].id === videoId){
            const updatedVideo : VideoType = {
                "title": req.body.title,
                "author": req.body.author,
                "availableResolutions": req.body.availableResolutions,
                "canBeDownloaded": req.body.canBeDownloaded,
                "minAgeRestriction": req.body.minAgeRestriction,
                "publicationDate": req.body.publicationDate
            }
            videos[i] = updatedVideo
            res.sendStatus(204)

            return
        }

    }
    res.sendStatus(404)
})// not done yet
videosRouter.delete('/:id', (req: Request, res: Response) => {
    if (req.params.id === undefined){
        res.sendStatus(404)
        return
    }
    let videoId : number = +req.params.id
    for(let i = 0; i < videos.length; i++){
        if (videos[i].id === videoId){
            videos.splice(i, 1)
            res.status(204)

            return
        }
    }
    res.status(404)
})