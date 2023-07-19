const mongoose = require("mongoose");
require('../db');

const Todos = require('../models/todo');

// getTodoById  
const  getTodoById =async(req, res, next)=> {
    try {
      const { id } = req.params;
  
      const todo = await Todos.findById(id);
  
      if (!todo) {
        return res.status(404).json({ error: "Todos not found" });
      }
  
      res.json({ todo });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch the todo!" });
    }
}
module.exports =  getTodoById ;  