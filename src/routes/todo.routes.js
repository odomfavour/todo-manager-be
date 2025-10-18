import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../controllers/todo.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management endpoints
 */

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos for the logged-in user
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of todos
 *       401:
 *         description: Unauthorized
 *
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Buy groceries
 *               description:
 *                 type: string
 *                 example: Milk, bread, and eggs
 *               completed:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Todo created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update an existing todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Buy fruits
 *               description:
 *                 type: string
 *                 example: Mangoes, bananas, apples
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       404:
 *         description: Todo not found
 *       401:
 *         description: Unauthorized
 *
 *   delete:
 *     summary: Delete a todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 *       401:
 *         description: Unauthorized
 */

router.route("/").get(protect, getTodos).post(protect, createTodo);
router.route("/:id").put(protect, updateTodo).delete(protect, deleteTodo);

export default router;
