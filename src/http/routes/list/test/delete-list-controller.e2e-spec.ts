import {afterAll, beforeAll, beforeEach, describe, expect} from "vitest";
import request = require("supertest");
import {prisma} from "../../../../lib/prisma";
import {randomUUID} from "node:crypto";
import {app} from "../../../server";

describe('Delete List (e2e)', () => {
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

    it('should be able to delete a list by Id', async () => {
        const response = await request(app.server).delete(`/list/${listId}`)

        expect(response.statusCode).toEqual(200)

        const list = await prisma.list.findFirst()

        expect(list).toEqual(null)
    })
})