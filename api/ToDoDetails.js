var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
    title: String,
    details: String
});

module.exports = mongoose.model(
    'todo', TodoSchema, 'Todos');