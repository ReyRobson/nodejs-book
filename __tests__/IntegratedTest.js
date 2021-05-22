const request = require('supertest')
const rotas = require('../index')

describe("Test get method", () => {
    test("It should response the GET method", async () => {
      const res = await request(rotas).get("/api/Holly")
        expect(res.statusCode).toBe(200);
    });
});