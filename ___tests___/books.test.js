const request = require("supertest");
const app = require("../server");
const db = require("../db");

let testBookId;

beforeAll(async () => {
  const book = await db.query(`
    INSERT INTO books (title, author)
    VALUES ('Book One', 'Author One')
    RETURNING id;
  `);
  testBookId = book.rows[0].id;
});

afterAll(async () => {
  await db.query("DELETE FROM books WHERE id = $1", [testBookId]);
  await db.end();
});

describe("Books API", () => {
  it("should get all books", async () => {
    const res = await request(app).get("/books");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});