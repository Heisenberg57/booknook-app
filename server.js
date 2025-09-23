const express = require('express');
const app = express();

//Middleware
app.use(express.json());

//Health check route
app.get("/health",(req,res)=>{
    res.json({status:"ok",timestamp:new Date()});
})

//Start Server
const PORT=3000;
app.listen(PORT,()=>{
    console.log(` Server running on http://localhost:${PORT}`);
})