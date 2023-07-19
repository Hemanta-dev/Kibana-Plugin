const mongoose = require("mongoose");
require('../db');

const Todos = require('../models/todo');

// GET /Todos
const  getAllTodos =async(req, res, next)=> {
    try {
      const todos = await Todos.find();
      res.status(200).json(todos);
    } catch (error) {
      next(error);
    }
  }

module.exports =  getAllTodos;  