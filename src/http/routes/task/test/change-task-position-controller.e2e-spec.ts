import {afterAll, beforeAll, beforeEach, describe, expect} from "vitest";
import request = require("supertest");
import {prisma} from "../../../../lib/prisma";
import {randomUUID} from "node:crypto";
import {app} from "../../../server";

describe('Change Task Position (e2e)', () => {
    const listId = randomUUID()
    const listId2 = randomUUID()
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
        await prisma.list.create({
            data: {
                id: listId2,
                name: 'Lista 2',
                position: 2
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

    it('should be able to change a task position by Id', async () => {
        const response = await request(app.server).put(`/taskPositionChange/${taskId}`).send({
            id: taskId,
            listPosition: 2,
            listId: listId2
        })

        expect(response.statusCode).toEqual(200)

        const task = await prisma.task.findFirst()

        expect(task).toEqual({
            id: task?.id,
            name: 'Task 1',
            description: "Description 1",
            listPosition: 2,
            listId: listId2
        })
    })
})