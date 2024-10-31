import {afterAll, beforeAll, beforeEach, describe, expect} from "vitest";
import request = require("supertest");
import {prisma} from "../../../../lib/prisma";
import {randomUUID} from "node:crypto";
import {app} from "../../../server";

describe('Update Many Tasks Positions (e2e)', () => {
    const listId = randomUUID()
    const taskId = randomUUID()
    const taskId2 = randomUUID()

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
        await Promise.all([
            prisma.task.create({
                data: {
                    id: taskId,
                    name: 'Task 1',
                    description: "Description 1",
                    listPosition: 1,
                    listId: listId
                }
            }),
            prisma.task.create({
                data: {
                    id: taskId2,
                    name: 'Task 2',
                    description: "Description 2",
                    listPosition: 2,
                    listId: listId
                }
            }),
        ])
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to update many tasks positions', async () => {
        const response = await request(app.server).put(`/tasks/positions`).send([
            {
                taskId: taskId,
                position: 2
            }, {
                taskId: taskId2,
                position: 1
            }
        ])

        expect(response.statusCode).toEqual(200)

        const task = await prisma.task.findMany({
            orderBy: {
                listPosition: 'asc'
            }
        })

        expect(task[0]).toEqual({
            id: taskId2,
            name: 'Task 2',
            description: "Description 2",
            listPosition: 1,
            listId: listId
        })
        expect(task[1]).toEqual({
            id: taskId,
            name: 'Task 1',
            description: "Description 1",
            listPosition: 2,
            listId: listId
        })
    })
})