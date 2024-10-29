import {beforeEach, describe, expect} from "vitest";
import {prisma} from "../../../lib/prisma";
import {randomUUID} from "node:crypto";
import {makeUpdateTaskFactory} from "../../../factories/task/make-update-task-factoy";
import {execSync} from "node:child_process";

describe('Update Task', () => {
    const sut = makeUpdateTaskFactory()
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
                name: "Task 1",
                description: "Description 1",
                listPosition: 1,
                listId: listId
            }
        })
    })

    it('should be able to update a task by Id', async () => {
        await sut.execute({
            id: taskId,
            description: "Description 2",
            name: "Task 2",
            listPosition: 4
        })

        const task = await prisma.task.findUnique({
            where: {
                id: taskId
            },
        })

        expect(task?.name).toEqual("Task 2")
        expect(task?.description).toEqual("Description 2")
        expect(task?.listPosition).toEqual(4)


    });
})