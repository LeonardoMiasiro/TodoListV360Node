import {afterAll, beforeAll, beforeEach, describe, expect} from "vitest";
import request = require("supertest");
import {prisma} from "../../../../lib/prisma";
import {randomUUID} from "node:crypto";
import {app} from "../../../server";

describe('Delete Task (e2e)', () => {
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
                position: 199
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

    it('should be able to delete a list by Id', async () => {
        const response = await request(app.server).delete(`/task/${taskId}`)

        expect(response.statusCode).toEqual(200)

        const task = await prisma.task.findFirst()

        expect(task).toEqual(null)
    })
})