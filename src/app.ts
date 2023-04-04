import {Request, Response, Router} from 'express'
import {app} from "./index"
import {constants} from "http2";
import {CreateVideoInputModelValidator, addDays, UpdateVideoInputModelValidator} from './Validators'
import {VideoType, FieldErrorType, CreateVideoInputModelType, UpdateVideoInputModelType, APIErrorResultType} from './appTypes'
// http
// req, res
// get | post | put | delete | patch


let videos: Array<VideoType> = []


// for read "body"
export const checkRouter = Router({})
export const testingRouter = Router({})
export const videosRouter = Router({})
checkRouter.get('/', (req: Request, res: Response) => {

    res.status(200).json({"key" : 'hello from videos api'})
})
testingRouter.delete("/testing/all-data", (req: Request, res: Response) => {
    videos = []
    res.sendStatus(204)
    return


})
videosRouter.get('', (req: Request, res: Response) => {
    res.status(200).send(videos)
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
            "canBeDownloaded": true, //By default - false
            "minAgeRestriction": null, //maximum: 18 minimum: 1 default: null nullable: true null - no restriction
            "createdAt":	date.toISOString(),
            "publicationDate":	addDays(date, 1).toISOString(), //By default - +1 day from CreatedAt
            "availableResolutions": typeof req.body.availableResolutions ==="undefined" ? [] : req.body.availableResolutions
        }
        videos.push(newVideo)
        res.status(201).send(newVideo)
    }



})

videosRouter.get('/:id', (req: Request, res: Response) => {
    if(+req.params.id > videos.length || +req.params.id < 0 ){
        res.sendStatus(404)
        return
    }

    let videoId : number = +req.params.id
    for(let i = 0; i < videos.length; i++){
        if (videos[i].id === videoId){
            res.status(200).send(videos[i])

            return
        }
    }
    res.sendStatus(404)
    return
})
videosRouter.put('/:id', (req: Request, res: Response) => {
    console.log(req.body)
    const videoIdToUpdate = +req.params.id //id of video in array "videos
    let flag = false
    let index = 0
    for(let i = 0; i < videos.length; i++){ // checking for id in video array
        if(videoIdToUpdate === videos[i].id){
            flag = true
            index = i
            break;
        }
    }
    if(!flag){
        res.sendStatus(404) // send 404 code if the video not found in array
    }else{
        const resultOfValidation = {result: true, errors: null}//UpdateVideoInputModelValidator(req.body) //if id found check for correct data
        if(!resultOfValidation.result){
            res.status(400).send(resultOfValidation.errors)
        } else {
            const updatedVideo : VideoType= {
                "id" : videoIdToUpdate,
                "title": req.body.title,
                "author": req.body.author,
                "canBeDownloaded": typeof req.body.canBeDownloaded === "undefined" ? videos[index].canBeDownloaded : req.body.canBeDownloaded, //By default - false
                "minAgeRestriction":typeof req.body.minAgeRestriction === "undefined" ? videos[index].minAgeRestriction : req.body.minAgeRestriction, //maximum: 18 minimum: 1 default: null nullable: true null - no restriction
                "createdAt":	videos[index].createdAt,
                "publicationDate":	typeof req.body.publicationDate === "undefined" ? videos[index].publicationDate: typeof req.body.publicationDate, //By default - +1 day from CreatedAt
                "availableResolutions": typeof req.body.availableResolutions ==="undefined" ? videos[index].availableResolutions : req.body.availableResolutions
            }
            console.log(updatedVideo)
            videos[index] = updatedVideo
            res.status(204).send(updatedVideo)
        }
    }


})
videosRouter.delete('/:id', (req: Request, res: Response) => {
    if (req.params.id === undefined){
        res.sendStatus(404)
        return
    }
    let videoId : number = +req.params.id
    for(let i = 0; i < videos.length; i++){
        if (videos[i].id === videoId){
            videos.splice(i, 1)
            res.sendStatus(204)

            return
        }
    }
    res.sendStatus(404)
})