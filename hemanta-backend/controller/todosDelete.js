const mongoose = require("mongoose");
require('../db');

const Todos = require('../models/todo');

//Delete /Todos  
const  deleteTodos =async(req, res, next)=> {
    try {
        const { id } = req.params;
    
        const todosDelete = await Todos.findByIdAndDelete(id);
    
        if (!todosDelete) {
          return res.status(404).json({ error: "Todos are not found" });
        }
    
        res.json({ message: "Todos Deleted successfully" });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to delete the Todos!" });
      }
  }  


module.exports =  deleteTodos;  