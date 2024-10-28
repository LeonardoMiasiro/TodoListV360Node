import {beforeEach, describe, expect} from "vitest";
import {makeGetListFactory} from "../../../factories/list/make-get-list-factory";
import {prisma} from "../../../lib/prisma";
import {randomUUID} from "node:crypto";

describe('Get List', () => {
    const sut = makeGetListFactory()
    const listId = randomUUID()

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