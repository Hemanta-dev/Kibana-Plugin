

// Update todos API: update-items
const Todos = require("../models/todo");

const  updateTodos =async(req, res, next)=> {
    try {
      const { id } = req.params;
      const updatedFields = req.body;
  
      const updatedTodos = await Todos.findByIdAndUpdate(id, updatedFields, { new: true });
  
      if (!updatedTodos) {
        return res.status(404).json({ error: "Todos not found" });
      }
  
      res.json({ message: "Todos updated successfully", updatedTodos });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to update the todos!" });
    }
}

module.exports =updateTodos;
