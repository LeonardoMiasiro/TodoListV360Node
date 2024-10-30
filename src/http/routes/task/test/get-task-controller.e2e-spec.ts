import {afterAll, beforeAll, beforeEach, describe, expect} from "vitest";
import request = require("supertest");
import {prisma} from "../../../../lib/prisma";
import {randomUUID} from "node:crypto";
import {app} from "../../../server";

describe('Get Task (e2e)', () => {
    const listId = randomUUID()
    const taskId = randomUUID()

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
        await prisma.task.create({
            data: {
                id: taskId,
                name: 'Task 1',
                description: "Description 1",
                listPosition: 1,
                listId: listId
            }
        })
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get a task by Id', async () => {
        const response = await request(app.server).get(`/task/${taskId}`)

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            task: expect.objectContaining({
                id: expect.any(String)
            })
        })
    })
})