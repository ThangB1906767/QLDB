const express = require("express");
const cors = require("cors");
const setupContactRouters = require("./app/routes/contact.routes")
const { BadRequestError,errorHandler} = require("./app/errors");
const app = express();
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.json({message : "Welcome to contact book application"});
});
setupContactRouters(app);

app.use((req,res,next)=>{
    next(new BadRequestError(404,"Resource not found"));
})

app.use((error,req,res,next)=>{
    errorHandler.handleError(error,res);
});
module.exports = app;


