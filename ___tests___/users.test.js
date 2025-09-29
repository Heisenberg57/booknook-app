const request = require("supertest");
const app = require("../server");
const db = require("../db");

let testUserId;

beforeAll(async()=>{
    const user = await db.query(`
    INSERT INTO users (name, email)
    VALUES ('User One', 'user1@example.com')
    RETURNING id;
  `);
  testUserId = user.rows[0].id;
});

afterAll(async () => {
  await db.query("DELETE FROM users WHERE id = $1", [testUserId]);
  await db.end();
});

describe("Users API",()=>{
    it("should get all users",async()=>{
        const res = await request(app).get("/users");
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("should get a user by user ID",async()=>{
        const res = await request(app).get(`/users/${testUserId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("id", testUserId);
    })

})