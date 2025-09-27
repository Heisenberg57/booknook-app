const express = require('express');
const app = express();
const pool = require('./db');

//Middleware
app.use(express.json());

//get all users
app.get("/users",async(req,res)=>{
    try{
        const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
        res.json(result.rows);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

//add a user.
app.post("/users",async(req,res)=>{
    try{
        const{name,email} = req.body;
        const result=await pool.query( "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
        [name, email]);
        res.json(result.rows[0]);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error");

    }
});

//borrow a book
app.post("/borrow",async(req,res)=>{
    try{
        const{user_id,book_id,due_date}=req.body;
         const result = await pool.query(
        "INSERT INTO borrowed_books (user_id, book_id, due_date) VALUES ($1, $2, $3) RETURNING *",
        [user_id, book_id, due_date]
    );
    res.json(result.rows[0]);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error");

    }
})

// See all borrowed books with user + book details
app.get("/borrowed", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT bb.id, u.name AS user, b.title AS book, bb.borrowed_at, bb.due_date
      FROM borrowed_books bb
      JOIN users u ON bb.user_id = u.id
      JOIN books b ON bb.book_id = b.id
      ORDER BY bb.borrowed_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//get a review
app.get("/reviews",async(req,res)=>{
    try{
        const result = await pool.query(`SELECT r.id, r.rating, r.comment, 
             u.name AS reviewer, 
             b.title AS book
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      JOIN books b ON r.book_id = b.id
      ORDER BY r.id DESC`);
      res.json(result.rows);
    }
    catch(err){
    console.error(err.message);
    res.status(500).send("Server error");

    }
});

//add a review
app.post("/reviews",async(req,res)=>{
    try{
        const {user_id, book_id, rating, comment} = req.body;

        const result = await pool.query(
      "INSERT INTO reviews (user_id, book_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, book_id, rating, comment]
    );
    res.json(result.rows[0]);

    }
    catch(err){
    console.error(err.message);
    res.status(500).send("Server error");
    }
});




//Health check route
app.get("/health",(req,res)=>{
    res.json({status:"ok",timestamp:new Date()});
})

app.get("/db-check",async(req,res)=>{
    try{
        const result = await pool.query("SELECT NOW()");
        res.json({ db_time: result.rows[0].now });

    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

app.get('/books',async(req,res)=>{
    try{
    const result = await pool.query('SELECT * FROM books');
    res.json(result.rows);
   }catch(err){
    res.status(500).json({ error: err.message });
   }
});

app.get('/books/:id/reviews',async(req,res)=>{
    try{
        const { id } = req.params;
        const result = await pool.query(
      'SELECT r.id, r.rating, r.comment, u.name AS reviewer FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.book_id = $1',
      [id]
    );
    res.json(result.rows);

    }
    catch(err){
     res.status(500).json({ error: err.message });
    }
});

//Start Server
const PORT=3000;
app.listen(PORT,()=>{
    console.log(` Server running on http://localhost:${PORT}`);
})