import {beforeEach, describe, expect} from "vitest";
import {makeGetListFactory} from "../../../factories/list/make-get-list-factory";
import {prisma} from "../../../lib/prisma";
import {randomUUID} from "node:crypto";
import {execSync} from "node:child_process";

describe('Get List', () => {
    const sut = makeGetListFactory()
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
                position: 199
            }
        })
    })


    it('should be able to get a list by Id', async () => {
        const {list} = await sut.execute({
            id: listId
        })

        expect(list.name).toBe("Lista 1")
        expect(list.position).toBe(199)

    });
})