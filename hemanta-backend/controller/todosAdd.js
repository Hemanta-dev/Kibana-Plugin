const mongoose = require("mongoose");
require('../db');

const Todos = require('../models/todo');

// POST /Todos  
const  addTodos =async(req, res, next)=> {
  const { todosInput} = req.body;

  if (!todosInput) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }

  try {
    const todosExists = await Todos.findOne({ todosInput: todosInput});

    if (todosExists) {
      return res.status(422).json({ error: "Todos already exists" });
    }

    const todosAdd = new Todos({
      todosInput: todosInput
    });

    await todosAdd.save();
    res.status(201).json({ message: "Todos Added Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to Add todos!" });
  }
  }  


module.exports =  addTodos;  