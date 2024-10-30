import {afterAll, beforeAll, beforeEach, describe, expect} from "vitest";
import request = require("supertest");
import {app} from "../../../server";
import {prisma} from "../../../../lib/prisma";
import {randomUUID} from "node:crypto";

describe('Create Task (e2e)', () => {
    const listId = randomUUID()

    beforeAll(async () => {
        await app.ready()
    })

    beforeEach(async () => {
        await prisma.list.create({
            data: {
                id: listId,
                name: 'Lista 1',
                position: 1
            }
        })
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a task', async () => {
        const response = await request(app.server).post(`/task`).send({
            name: 'Task 1',
            description: "Description 1",
            listPosition: 1,
            listId: listId
        })

        expect(response.statusCode).toEqual(201)

        const task = await prisma.list.findFirst()

        expect(task).toEqual({
            id: task?.id,
            name: 'Lista 1',
            position: 1
        })
    })
})