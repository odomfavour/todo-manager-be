import { Todo } from "../models/todo.model.js";

export const getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user._id });
  res.json(todos);
};

export const createTodo = async (req, res) => {
  const { title, description } = req.body;
  const todo = await Todo.create({ user: req.user._id, title, description });
  res.status(201).json(todo);
};

export const updateTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  if (todo.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });

  const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  if (todo.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });

  await todo.deleteOne();
  res.json({ message: "Todo deleted" });
};
