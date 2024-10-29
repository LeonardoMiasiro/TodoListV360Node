import {beforeEach, describe, expect} from "vitest";
import {prisma} from "../../../lib/prisma";
import {randomUUID} from "node:crypto";
import {makeUpdateListFactory} from "../../../factories/list/make-update-list-factory";
import {execSync} from "node:child_process";

describe('Update List', () => {
    const sut = makeUpdateListFactory()
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

    it('should be able to update a list by Id', async () => {
        await sut.execute(
            {id: listId,
                name: "Lista 2",
                position: 3
            })

        const list = await prisma.list.findUnique({
            where: {
                id: listId
            },
        })

        expect(list?.name).toEqual("Lista 2")
        expect(list?.position).toEqual(3)

    });
})