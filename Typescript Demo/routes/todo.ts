import { Router } from "express"
import {addTodo, getTodos, updateTodo, deleteTodo}  from "../controller/todos/todo";

const router: Router = Router();

router.post("/add-todo", addTodo);
router.get("/todos", getTodos);
router.put("/edit-todo/:id", updateTodo);
router.delete("/delete-todo/:id", deleteTodo);

export default router