import { Todo } from "../models/todo.model.js";

// Get all todos for the logged-in user
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new todo
export const createTodo = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    // optional: validate priority
    const allowedPriorities = ["high", "medium", "low"];
    const todoPriority = allowedPriorities.includes(priority) ? priority : "medium";

    const todo = await Todo.create({
      user: req.user._id,
      title,
      description,
      priority: todoPriority,
    });

    res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a todo
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    if (todo.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    const { title, description, priority, completed } = req.body;

    // optional: validate priority
    const allowedPriorities = ["high", "medium", "low"];
    const todoPriority = allowedPriorities.includes(priority) ? priority : todo.priority;

    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, priority: todoPriority, completed },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    if (todo.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    await todo.deleteOne();
    res.json({ message: "Todo deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
