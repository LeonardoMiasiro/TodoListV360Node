import {beforeEach, describe, expect} from "vitest";
import {prisma} from "../../../lib/prisma";
import {randomUUID} from "node:crypto";
import {makeChangeTaskPositionTaskFactory} from "../../../factories/task/make-change-task-position-factory";
import {execSync} from "node:child_process";

describe('Change Task Position', () => {
    const sut = makeChangeTaskPositionTaskFactory()
    const listId = randomUUID()
    const taskId = randomUUID()
    const listId2 = randomUUID()

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
                name: "Task 1",
                description: "Description 1",
                listPosition: 1,
                listId: listId
            }
        })
    })

    it('should be able to change a task position', async () => {
        await sut.execute({
            id: taskId,
            listId: listId2,
            listPosition: 3
            })

        const task = await prisma.task.findUnique({
            where: {
                id: taskId
            },
        })

        expect(task?.listId).toEqual(listId2)
        expect(task?.listPosition).toEqual(3)

    });
})