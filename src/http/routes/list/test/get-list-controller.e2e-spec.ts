import {afterAll, beforeAll, beforeEach, describe, expect} from "vitest";
import request = require("supertest");
import {prisma} from "../../../../lib/prisma";
import {randomUUID} from "node:crypto";
import {app} from "../../../server";

describe('Get List (e2e)', () => {
    const listId = randomUUID()

    beforeAll(async () => {
        await app.ready()
    })

    beforeEach(async () => {
        await prisma.list.create({
            data: {
                id: listId,
                name: 'Lista 1',
                position: 199
            }
        })
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get a list by Id', async () => {
        const response = await request(app.server).get(`/list/${listId}`)

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            list: expect.objectContaining({
                id: expect.any(String)
            })
        })
    })
})