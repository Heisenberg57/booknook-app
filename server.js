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

//Start Server
const PORT=3000;
app.listen(PORT,()=>{
    console.log(` Server running on http://localhost:${PORT}`);
})