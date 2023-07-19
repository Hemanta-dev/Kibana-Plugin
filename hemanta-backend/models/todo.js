const mongoose = require("mongoose");


const todoSchema = new mongoose.Schema({
   todosInput: {
    type: String,
    required: true,
   },
});


const Todos = mongoose.model("Todo", todoSchema );

module.exports = Todos;