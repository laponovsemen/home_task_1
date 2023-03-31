

import express, {Request, Response} from 'express'
// http
// req, res
// get | post | put | delete | patch

let videos: Array<VideoType> = []
let products = [{title: "pomidory"},
    {title: "ogurtsy"},
    {title: "ananus"},
    {title: "tomato"},]
let greeting = "idi nahui"

export const app = express()

// for read "body"
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('hello from videos api')
})
app.get('/videos', (req: Request, res: Response) => {
    res.send(videos)
})
app.get('/greeting', (req: Request, res: Response) => {
    res.send(greeting)
})
app.get('/products', (req: Request, res: Response) => {
    res.send(products)
})
app.get('/products/:productTitle', (req: Request, res: Response) => {

    let prod = products.find(p => p.title === req.params.productTitle)
    if (prod){
        res.send(prod)
    }else{
        res.send(404)
    }

})


app.delete("/testing/all-data", (req: Request, res: Response) => {
    videos = []
    res.send(204)
    return
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
