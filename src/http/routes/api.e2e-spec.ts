import {afterAll, beforeAll, describe, expect} from "vitest";
import {app} from "../server";
import request = require("supertest");

describe('Api Test', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Api test', async () => {
        const response = await request(app.server).get('/healthCheck')

        expect(response.statusCode).toEqual(200)
    })
})