import {beforeEach, describe, expect} from "vitest";
import {prisma} from "../../../lib/prisma";
import {randomUUID} from "node:crypto";
import {makeDeleteListFactory} from "../../../factories/list/make-delete-list-factory";
import {execSync} from "node:child_process";

describe('Delete List', () => {
    const sut = makeDeleteListFactory()
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

    it('should be able to delete a list by Id', async () => {
        await sut.execute({
            id: listId
        })

        expect(await prisma.list.findMany()).toHaveLength(0)
    });
})