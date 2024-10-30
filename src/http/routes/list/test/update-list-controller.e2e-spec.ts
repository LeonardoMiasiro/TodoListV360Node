import {afterAll, beforeAll, beforeEach, describe, expect} from "vitest";
import request = require("supertest");
import {prisma} from "../../../../lib/prisma";
import {randomUUID} from "node:crypto";
import {app} from "../../../server";

describe('Update List (e2e)', () => {
    const listId = randomUUID()

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
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

    it('should be able to update a list by Id', async () => {
        const response = await request(app.server).put(`/list/${listId}`).send({
            id: listId,
            name: 'Lista 2',
            position: 200
        })

        expect(response.statusCode).toEqual(200)

        const list = await prisma.list.findFirst()

        expect(list).toEqual({
            id: list?.id,
            name: 'Lista 2',
            position: 200
        })
    })
})