import {afterAll, beforeAll, describe, expect} from "vitest";
import request = require("supertest");
import {app} from "../../../server";
import {prisma} from "../../../../lib/prisma";

describe('Create List (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a list', async () => {
        const response = await request(app.server).post(`/list`).send({
            name: 'Lista 1',
            position: 1
        })

        expect(response.statusCode).toEqual(201)

        const list = await prisma.list.findFirst()

        expect(list).toEqual({
            id: list?.id,
            name: 'Lista 1',
            position: 1
        })
    })
})