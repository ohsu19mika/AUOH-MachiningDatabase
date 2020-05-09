const express = require('express');
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const app = express();
const body_parser = require('body-parser')

const machining_controller = require('./machining_controller');

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true}));

app.use((req,res,next)=>{
    console.log(req.method, ' ', req.path);
    next();
});

//app.use("/", express.static("public"));

// RESTful API
// CRUD OPERATIONS

// CREATE
app.post("/api/machining-parameter-set", machining_controller.api_post_machining)

// READ
app.get("/api/machining-parameter-set/:id", machining_controller.api_get_machining);
app.get("/api/machining-parameter-sets", machining_controller.api_get_machinings);

// UPDATE
app.put("/api/machining-parameter-set/:id", machining_controller.api_put_machining);

// DELETE
app.delete("/api/machining-parameter-set/:id", machining_controller.api_delete_machining);



//Database connection
const database_uri = "mongodb+srv://server:Bwhx7kQeLlmGIGYq@cluster0-wicfr.mongodb.net/machiningdb?retryWrites=true&w=majority";

mongoose.connect(database_uri, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(()=>{
    console.log('database connected')
    app.listen(port);
}).catch(err=>{
    console.log(err);
});
