const express = require('express');
require('dotenv').config();
const getAllTodos = require('../controller/Todo');
const addTodos = require('../controller/todosAdd');
const deleteTodos =require('../controller/todosDelete');
const getTodoById = require('../controller/todosGetById');
const updateTodos = require('../controller/todosEdit');

const router = express.Router();

//db connection
require('../db');


//router path
router.get('/list-todos', getAllTodos);
router.post('/add-todos', addTodos);
router.delete('/delete-todos/:id', deleteTodos);
router.get('/get-todos/:id', getTodoById);
router.put('/edit-todos/:id', updateTodos);

module.exports = router;
  