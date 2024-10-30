import {afterAll, beforeAll, beforeEach, describe, expect} from "vitest";
import request = require("supertest");
import {prisma} from "../../../../lib/prisma";
import {randomUUID} from "node:crypto";
import {app} from "../../../server";

describe('Get All List (e2e)', () => {
    const listId = randomUUID()

    beforeAll(async () => {
        await app.ready()
    })

    beforeEach(async () => {
        for (let i = 0; i < 4; i++) {
            await prisma.list.create({
                data: {
                    id: listId + i,
                    name: 'Lista 1',
                    position: 1
                }
            })
        }
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get all lists', async () => {
        const response = await request(app.server).get(`/listAll`)

        expect(response.statusCode).toEqual(200)
        expect(response.body.list).toHaveLength(4)
    })
})