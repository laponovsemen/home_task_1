// @ts-ignore
import request from 'supertest'
import {app} from "../../src";
describe("/", () => {
    it("should return {\"key\" : 'hello from videos api'} and status code 200", async () => {
        expect(1).toBe(1);

        await request(app)
            .get("")
            .expect(200,{"key" : 'hello from videos api'} )
    })
})

describe("", () => {
    it("should return status code 204", async () => {

        await request(app)
            .delete("/ht_01/api/testing/all-data")
            .expect(204)
    })
})