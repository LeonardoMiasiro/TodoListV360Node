import {beforeEach, describe, expect} from "vitest";
import {prisma} from "../../../lib/prisma";
import {randomUUID} from "node:crypto";
import {makeCreateTaskFactory} from "../../../factories/task/make-create-task-factory";
import {execSync} from "node:child_process";

describe('Create Task', () => {
    const sut = makeCreateTaskFactory()
    const listId = randomUUID()

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
    })

    it('should be able to create a task with description', async () => {
        await sut.execute({
            name: 'Task 1',
            description: 'Description 1',
            listId: listId,
            listPosition: 1
        })

        const task = await prisma.task.findFirst()

        expect(task?.name).toBe('Task 1')
        expect(task?.description).toBe('Description 1')
        expect(task?.listId).toBe(listId)
        expect(task?.listPosition).toBe(1)

    });
})