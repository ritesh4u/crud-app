var express = require('express');
var app = express();
var cors = require('cors');
var PORT = 3000;
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongoUrl = "mongodb://localhost:27017/todo_db";
var router = require('./Router');

mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (error) {
    if (error) {
        console.log("Error!" + error);
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
// Parses the text as json 
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);
app.get("*", (req, res) => {
    res.send({ error: true, message: "No matching route found" });
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});


