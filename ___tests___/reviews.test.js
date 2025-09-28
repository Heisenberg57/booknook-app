const request = require("supertest");
const app = require("../server");
const db = require("../db");




describe("Reviews API",()=>{
    it("should create a new review",async()=>{
        const res = await request(app)
        .post("/reviews")
        .send({
        user_id: 1,
        book_id: 1,
        rating: 5,
        comment: "Amazing book!"
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("id");
        expect(res.body.rating).toBe(5);
    });

    it("should get all reviews",async()=>{
        const res = await request(app).get("/reviews");
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("should update a review",async()=>{
        const res = await request(app)
        .put("/reviews/8")
        .send({
            rating:4,
            comment:"Updated Review"
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body.comment).toBe("Updated Review");
    });

    it("should delete a review",async()=>{
        const res = await request(app).delete("/reviews/8");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Review deleted successfully");
    })
});

// ...existing code...


afterAll(async () => {
  await db.end(); // this works
});



