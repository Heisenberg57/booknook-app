const express = require('express');
const path = require("path");
const app = express();
const pool = require('./db');

//Middleware
app.use(express.json());

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// --- UI Routes ---
// Homepage
app.get("/", (req, res) => {
  res.render("index", { title: "BookNook Library" });
});

// Users page
app.get("/users-ui", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
    res.render("users", { users: result.rows });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Handle user form submission
app.post("/users-ui", async (req, res) => {
  try {
    const { name, email } = req.body;
    await pool.query("INSERT INTO users (name, email) VALUES ($1, $2)", [name, email]);
    res.redirect("/users-ui"); // refresh page after adding
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/////////// All USERS ROUTES/////////////

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

// Get a user by ID
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


// Update a user
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete a user.

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


////////BOOKS ROUTES ////////


//get books
app.get('/books',async(req,res)=>{
    try{
    const result = await pool.query('SELECT * FROM books');
    res.json(result.rows);
   }catch(err){
    res.status(500).json({ error: err.message });
   }
});

// Get a book by ID
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Add a book
app.post("/books", async (req, res) => {
  try {
    const { title, author,published_year } = req.body;
    const result = await pool.query(
      "INSERT INTO books (title, author,published_year) VALUES ($1, $2, $3) RETURNING *",
      [title, author, published_year]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


// Update a book
app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author ,published_year} = req.body;

    const result = await pool.query(
      "UPDATE books SET title = $1, author = $2, published_year=$3 WHERE id = $4 RETURNING *",
      [title, author, published_year, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


// Delete a book
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM books WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//get a book review by id
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

///// BORROW ROUTES ///////
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

//////// REVIEWS ROUTES /////

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

// Update a review
app.put("/reviews/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const result = await pool.query(
      "UPDATE reviews SET rating = $1, comment = $2 WHERE id = $3 RETURNING *",
      [rating, comment, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete a review
app.delete("/reviews/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM reviews WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json({ message: "Review deleted successfully" });
  } catch (err) {
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




  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });


module.exports = app;
