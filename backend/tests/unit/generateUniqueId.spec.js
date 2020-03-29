const geerateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
    it('should generate and unique ID', () => {
        const id = geerateUniqueId();

        expect(id).toHaveLength(8);
    })
})