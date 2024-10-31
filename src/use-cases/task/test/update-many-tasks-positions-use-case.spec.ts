import {afterAll, beforeAll, beforeEach, describe, expect} from "vitest";
import {randomUUID} from "node:crypto";
import { execSync } from "node:child_process";
import { makeUpdateManyTasksPositionsFactory } from "src/factories/task/make-update-many-tasks-positions-factory";
import {prisma} from "../../../lib/prisma";

describe('Update Many Tasks Positions', () => {
    const sut = makeUpdateManyTasksPositionsFactory()
    const listId = randomUUID()
    const taskId = randomUUID()
    const taskId2 = randomUUID()

    beforeAll(async () => {
        execSync('npx prisma migrate dev');
    });

    afterAll(async () => {
        await prisma.deleteSchema()
    });

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

    it('should be able to update many tasks positions', async () => {
        await sut.execute([
            {
                taskId: taskId,
                position: 2
            }, {
                taskId: taskId2,
                position: 1
            }
        ])

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