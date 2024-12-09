import express from "express";
const router = express.Router();
import {
  getTodoTasks,
  addTodoTask,
  getTodoTask,
  deleteTodoTask,
  updateTodoTask,
} from "../controllers/todoTaskController.js";
import requireAuth from "../middleware/requireAuth.js";

// require auth for all workout routes
router.use(requireAuth);

// GET all TodoTasks
router.get("/", getTodoTasks);

// POST a new TodoTask
router.post("/", addTodoTask);

// GET a single TodoTask
router.get("/:id", getTodoTask);

// DELETE a TodoTask
router.delete("/:id", deleteTodoTask);

// Update TodoTask using PUT
router.put("/:id", updateTodoTask);

export default router;
