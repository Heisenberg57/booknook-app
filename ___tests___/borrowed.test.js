const request = require("supertest");
const app = require("../server");
const db = require("../db");

let testUserId;
let testBookId;
let testBorrowId;

beforeAll(async () => {
  // create test user
  const userRes = await db.query(
    `INSERT INTO users (name, email)
     VALUES ('Borrow User', 'borrow@example.com')
     RETURNING id`
  );
  testUserId = userRes.rows[0].id;

  // create test book
  const bookRes = await db.query(
    `INSERT INTO books (title, author)
     VALUES ('Borrowed Book', 'Some Author')
     RETURNING id`
  );
  testBookId = bookRes.rows[0].id;
});

describe("Borrowed Books API", () => {
  it("should allow a user to borrow a book", async () => {
    const res = await request(app)
      .post("/borrow")
      .send({
        user_id: testUserId,
        book_id: testBookId,
        due_date: "2025-12-31",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body.user_id).toBe(testUserId);
    expect(res.body.book_id).toBe(testBookId);

    testBorrowId = res.body.id;
  });

  it("should list borrowed books with user and book details", async () => {
    const res = await request(app).get("/borrowed");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    // Ensure our borrow record is there
    const borrowRecord = res.body.find(b => b.id === testBorrowId);
    expect(borrowRecord).toBeDefined();
    expect(borrowRecord.user).toBe("Borrow User");
    expect(borrowRecord.book).toBe("Borrowed Book");
  });
});

afterAll(async () => {
  // clean up
  await db.query("DELETE FROM borrowed_books WHERE id = $1", [testBorrowId]);
  await db.query("DELETE FROM users WHERE id = $1", [testUserId]);
  await db.query("DELETE FROM books WHERE id = $1", [testBookId]);

  await db.end();
});