import express, {Request, Response} from 'express'
// http
// req, res
// get | post | put | delete | patch

let videos = [{id: 1, title: "kamasutra"},
    {id: 2, title: "heroku"}]
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

app.post('/', (req: Request, res: Response) => {
    const title = req.body.title
    const newVideo = {
        id: videos.length + 1,
        title: title
    }
    videos.push(newVideo)
    res.send(newVideo)
})
