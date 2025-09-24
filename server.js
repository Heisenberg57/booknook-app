const express = require('express');
const app = express();
const pool = require('./db');

//Middleware
app.use(express.json());

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