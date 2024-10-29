import {beforeEach, describe, expect} from "vitest";
import {prisma} from "../../../lib/prisma";
import {randomUUID} from "node:crypto";
import {makeDeleteTaskFactory} from "../../../factories/task/make-delete-task-factory";
import {execSync} from "node:child_process";

describe('Delete Task', () => {
    const sut = makeDeleteTaskFactory()
    const listId = randomUUID()
    const taskId = randomUUID()

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

    it('should be able to delete a task by Id', async () => {
        await sut.execute({
            id: taskId
        })

        expect(await prisma.task.findMany()).toHaveLength(0)
    });
})