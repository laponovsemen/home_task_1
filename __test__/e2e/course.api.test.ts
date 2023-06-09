// @ts-ignore
import request from 'supertest'
import {app} from "../../src";
import {addDays} from "../../src/Validators";
import exp = require("constants");

describe("checking for BASE url", () => {
    it("should return {\"key\" : 'hello from videos api'} and status code 200", async () => {
        await request(app)
            .get("/")
            .expect(200,{"key" : 'hello from videos api'} )
    })
})

describe("checking for DELETING all data", () => {
    it("should return status code 204", async () => {

        await request(app)
            .delete("/testing/all-data")
            .expect(204)
    })
})

describe("checking for GET request in Videos API // RETURN ALL VIDEOS", () => {
    beforeAll(async () => {
        await request(app).delete("/testing/all-data")

    })
    it("should return status code 200 and array of videos", async () => {

        const blogs = await request(app)
            .get("/videos")
            .expect(200)
        expect(blogs.body).toStrictEqual( [])
    })
})

describe("checking for POST request in Videos API // RETURN POSTED VIDEOS", () => {
    beforeAll(async () => {
        await request(app).delete("/testing/all-data")

    })
    //TESTING WITH CORRECT DATA
    it("should return status code 201 and fulfilled fields of sent params", async () => {
        const result = await request(app)
            .post("/videos")
            .send({
                "title" : "Tanja",  //maxLength: 40
                "author": "semen",  // maxLength: 20
                "availableResolutions": null
            })
            .expect(201)
        expect(result.body.title).toEqual("Tanja")
        expect(result.body.author).toEqual("semen")
        expect(result.body.availableResolutions).toEqual(null)
    })
    it("should return status code 201 and full video params excluding Date// NUMBER 1 Checking for correct id creation", async () => {
        await request(app).delete("/testing/all-data")
        const result = await request(app)
            .post("/videos")
            .send({
                "title" : "Tanja",  //maxLength: 40
                "author": "semen",  // maxLength: 20
                "availableResolutions": null
            })
            .expect(201)
        expect(result.body).toEqual({
            "id" : 1,
            "title" : "Tanja",
            "author": "semen",  // maxLength: 20
            "availableResolutions": null,
            "createdAt" : expect.any(String),
            "publicationDate": expect.any(String),
            "minAgeRestriction": null,
            "canBeDownloaded": false
        })
    })
    it("should return status code 201 and full video params excluding Date// NUMBER 2 Checking for correct id creation", async () => {
        const result = await request(app)
            .post("/videos")
            .send({
                "title" : "Tanja",  //maxLength: 40
                "author": "semen",  // maxLength: 20
                "availableResolutions": null
            })
            .expect(201)
        expect(result.body).toEqual({
            "id" : 2,
            "title" : "Tanja",
            "author": "semen",  // maxLength: 20
            "availableResolutions": null,
            "createdAt" : expect.any(String),
            "publicationDate": expect.any(String),
            "minAgeRestriction": null,
            "canBeDownloaded": false
        })
    })
    it("should return status code 201 and full video params excluding Date// NUMBER 3 Checking for correct id creation", async () => {
        const result = await request(app)
            .post("/videos")
            .send({
                "title" : "Tanja",  //maxLength: 40
                "author": "semen",  // maxLength: 20
                "availableResolutions": null
            })
            .expect(201)
        expect(result.body).toEqual({
            "id" :3,
            "title" : "Tanja",
            "author": "semen",  // maxLength: 20
            "availableResolutions": null,
            "createdAt" : expect.any(String),
            "publicationDate": expect.any(String),
            "minAgeRestriction": null,
            "canBeDownloaded": false
        })
    })
    it("should return status code 201 and full video params excluding Date// NUMBER 4 Checking for correct id creation with any params", async () => {
        const result = await request(app)
            .post("/videos")
            .send({
                "title" : "colombo",  //maxLength: 40
                "author": "aries j",  // maxLength: 20
                "availableResolutions": ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]
            })
            .expect(201)
        expect(result.body).toEqual({
            "id" :4,
            "title" : "colombo",
            "author": "aries j",  // maxLength: 20
            "availableResolutions": ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"],
            "createdAt" : expect.any(String),
            "publicationDate": expect.any(String),
            "minAgeRestriction": null,
            "canBeDownloaded": false
        })
    })
    //TESTING WITH WRONG DATA
    it("should return status code 400 and array of errors // NUMBER 1 Wrong title field", async () => {
        await request(app).delete("/testing/all-data")
        const result = await request(app)
            .post("/videos")
            .send({
                "title" : "TanjaTanjaTanjaTanjaTanjaTanjaTanjaTanjaTanja",  //maxLength: 45 wrong quantity of chars
                "author": "semen",  // maxLength: 20
                "availableResolutions": null
            })
            .expect(400)
        expect(result.body).toEqual({"errorsMessages": [{"field": "title", "message": "the length of string in title in object for CreateVideoInputModel is more than 40 characters"}]})

    })
    it("should return status code 400 and array of errors// NUMBER 2 All Data is string but to big in length", async () => {
        await request(app).delete("/testing/all-data")
        const result = await request(app)
            .post("/videos")
            .send({
                "title" : "TanjaTanjaTanjaTanjaTanjaTanjaTanjaTanjaTanja",  //maxLength: 45 wrong quantity of chars
                "author": "TanjaTanjaTanjaTanjaTanjaTanjaTanjaTanjaTanja",  // maxLength: 20
                "availableResolutions": ["TanjaTanjaTanjaTanjaTanjaTanjaTanjaTanjaTanja"]
            })
            .expect(400)
        expect(result.body).toEqual({"errorsMessages":  [{"field": "title", "message": "the length of string in title in object for CreateVideoInputModel is more than 40 characters"},
            {"field": "author", "message": "the length of string in 'author' in object for CreateVideoInputModel is more than 20 characters"},
            {"field": "availableResolutions","message": "wrong values of resolutions given by creating new video"}]})

    })
    /*it("should return status code 400 and array of errors// NUMBER 3 All Data is undefined ", async () => {
        await request(app).delete("/testing/all-data")
        const result = await request(app)
            .post("/videos")
            .send({
                "title" : undefined,  //
                "author": undefined,  // maxLength: 20
                "availableResolutions": ["P144"]
            })
            .expect(400)
        expect(result.body).toEqual([{"field": "title", "message": "the length of string in title in object for CreateVideoInputModel is more than 40 characters"},
            {"field": "author", "message": "the length of string in 'author' in object for CreateVideoInputModel is more than 20 characters"},
            {"field": "availableResolutions","message": "wrong values of resolutions given by creating new video"}])

    })*/
    it("should return status code 400 and array of errors// NUMBER 3 \"title\" : null", async () => {
        await request(app).delete("/testing/all-data")
        const result = await request(app)
            .post("/videos")
            .send({"title":null,
                "author":"valid author",
                "availableResolutions":["P144","P240","P720"]})
            .expect(400)
        expect(result.body).toEqual({ errorsMessages: [{ message: "no title in object for CreateVideoInputModel", field: "title" }] })

    })

})

describe("checking for GET request by ID in Videos API // RETURN VIDEO BY ID", () => {
    beforeAll(async () => {
        await request(app).delete("/testing/all-data")

    })
    it("should return status code 404 because no video found", async () => {
        await request(app).delete("/testing/all-data")
        const blogs = await request(app)
            .get("/videos/2")
            .expect(404)

    })
    it("should return status code 404 because no video found", async () => {
        const blogs = await request(app)
            .get("/videos/0")
            .expect(404)
    })
    it("should return status code 404 because no video found", async () => {
        const blogs = await request(app)
            .get("/videos/-1908990")
            .expect(404)
    })
    it("should return status code 404 because no video found", async () => {
        const blogs = await request(app)
            .get("/videos/1908990")
            .expect(404)
    })
    it("should return status code 200 because video found", async () => {
        const semires = await request(app).post("/videos").send({
            "title": "onegin",
            "author": "rogurtzminda",
            "availableResolutions" : null
        })
        const id = semires.body.id
        const blogs = await request(app)
            .get(`/videos/${id}`)
            .expect(200)

    })
})
describe("checking for PUT request by ID in Videos API // RETURN STATUS CODE 204 / 400 / 404", () => {
    beforeAll(async () => {
        await request(app).delete("/testing/all-data")

    })
    it("should return status code 204 //WHEN VIDEO UPDATED", async () => {
        await request(app).delete("/testing/all-data")
        const postedVideo = await request(app).post("/videos").send({
            "title" :"GachiMuchi",
            "author": "Van Darkholm",
            "availableResolutions": ["P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]
        })
        const postedVideoID = postedVideo.body.id
        const updateVideo = await request(app).put(`/videos/${postedVideoID}`).send({
            "title" :"Billy Herington",
            "author": "Billy Herington ",
            "canBeDownloaded" : false,
            "minAgeRestriction" : 16,
            "availableResolutions": ["P144"],
            "publicationDate": new Date().toISOString()
        }).expect(204)
        expect(updateVideo.body).toEqual({})
    })

    it("should return status code 204 //WHEN VIDEO UPDATED", async () => {
        await request(app).delete("/testing/all-data")
        const postedVideo = await request(app).post("/videos").send({
            "title": "GachiMuchi",
            "author": "Van Darkholm",
            "availableResolutions": ["P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]
        })
        const postedVideoID = postedVideo.body.id
        const updateVideo = await request(app).put(`/videos/${postedVideoID}`).send({
            "title": "Billy Herington",
            "author": "Billy Herington",
            "canBeDownloaded": false,
            "minAgeRestriction": 16,
            "availableResolutions": ["P144"],
            "publicationDate": "string"
        }).expect(400)
        expect(updateVideo.body).toEqual({
            "errorsMessages": [{
                "field": "publicationDate",
                "message": "wrong date format to update"
            }]
        })
    })

})
describe("checking for DELETE request by ID in Videos API // RETURN VIDEO BY ID", () => {
    beforeAll(async () => {
        await request(app).delete("/testing/all-data")

    })
    it("should return status code 204 when video found and 404 vice versa", async () => {
        const newReq = await request(app).post("/videos").send({
            "title" : "title",
            "author":"author",
            "availableResolutions" : null
        })
        const newId = newReq.body.id
        const blogs = await request(app)
            .delete(`/videos/${newId}`)
            .expect(204)
        await request(app)
            .delete(`/videos/${newId + 100}`)
            .expect(404)
    })
    it("should return empty array of videos when one video created and then deleted by id", async () => {
        await request(app).delete("/testing/all-data")
        const newReq = await request(app).post("/videos").send({
            "title" : "title",
            "author":"author",
            "availableResolutions" : null
        })
        const newId = newReq.body.id
        const blogs = await request(app)
            .delete(`/videos/${newId}`)
            .expect(204)
        const deletedVideos = await request(app)
            .get('/videos')
            .expect(200 )
        expect(deletedVideos.body).toEqual([])
    })

})