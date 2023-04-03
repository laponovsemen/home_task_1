import {Request, Response, Router} from 'express'
import {app} from "./index"
import {constants} from "http2";

// http
// req, res
// get | post | put | delete | patch


let videos: Array<VideoType> = []


// for read "body"
export const checkRouter = Router({})
export const testingRouter = Router({})
export const videosRouter = Router({})
checkRouter.get('', (req: Request, res: Response) => {
    res.json({"key" : 'hello from videos api'})
    res.sendStatus(200)
})
testingRouter.delete("/testing/all-data", (req: Request, res: Response) => {
    videos = []
    res.sendStatus(204)
    return


})
videosRouter.get('', (req: Request, res: Response) => {
    res.send(videos)
})
videosRouter.post('', (req: Request, res: Response) => {
    const resultOfValidation = CreateVideoInputModelValidator(req.body)
    if(!resultOfValidation.result){
        res.status(400).send(resultOfValidation.errors)
    } else {
        const videosId = videos.length + 1
        let date = new Date()
        const newVideo = {
            "id" : videosId,
            "title": req.body.title,
            "author": req.body.author,
            "canBeDownloaded": req.body.canBeDownloaded ==="undefined" ? false : req.body.canBeDownloaded, //By default - false

            "minAgeRestriction": req.body.minAgeRestriction ==="undefined" ? null : req.body.minAgeRestriction, //maximum: 18 minimum: 1 default: null nullable: true null - no restriction
            "createdAt":	date.toISOString(),
            "publicationDate":	addDays(date, 1).toISOString(), //By default - +1 day from CreatedAt
            "availableResolutions": req.body.availableResolutions ==="undefined" ? null : req.body.availableResolutions
        }
        videos.push(newVideo)
        res.status(201).send(newVideo)
    }



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
    return
})
videosRouter.put('/:id', (req: Request, res: Response) => {

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