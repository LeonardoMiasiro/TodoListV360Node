import {beforeEach, describe, expect} from "vitest";
import {prisma} from "../../../lib/prisma";
import {randomUUID} from "node:crypto";
import {makeChangeListPositionListFactory} from "../../../factories/list/make-change-list-position-factory";
import {execSync} from "node:child_process";

describe('Change List Position', () => {
    const sut = makeChangeListPositionListFactory()
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

    it('should be able to change list position by Id', async () => {
        await sut.execute(
            {id: listId,
                position: 2
            })

        const list = await prisma.list.findUnique({
            where: {
                id: listId
            },
        })

        expect(list?.position).toEqual(2)

    });
})