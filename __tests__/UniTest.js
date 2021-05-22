const choose = require('../simplesfunction')

describe("Test numbers", () => {
    test("Verify if a number was passed", () => {
        expect(choose(3)).not.toBe('nao é numero')
    });
});