// @ts-ignore
import request from 'supertest'
import {app} from "../../src";
import {before} from "node:test";
describe("checking for base url", () => {
    it("should return {\"key\" : 'hello from videos api'} and status code 200", async () => {
        expect(1).toBe(1);

        await request(app)
            .get("")
            .expect(200,{"key" : 'hello from videos api'} )
    })
})

describe("checking for GET request in Videos API // RETURN ALL VIDEOS", () => {
    beforeAll(async () => {
        await request(app).delete("/testing/all-data")
        await request(app).post("/videos").send({
            "title": "string",
            "author": "string",
            "availableResolutions": [
                "P144"
            ]
        })
    })
    it("should return status code 204 and array of videos", async () => {

        const blogs = await request(app)
            .get("/videos")
            .expect(200)
        expect(blogs.body).toStrictEqual( [{
            "id" : 1,
            "title": "string",
            "author": "string",
            "availableResolutions": [
                "P144"
            ]
        }])
    })
})



