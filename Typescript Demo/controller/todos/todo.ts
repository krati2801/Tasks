import { Request } from "express"
import { ITodo } from "../../types/todo"
import Todo from "../../model/todo"

const addTodo = async (req: Request, res: any): Promise<void> => {
  try {
    const body = req.body as Pick<ITodo, "name" | "description" | "status">

    const todo: ITodo = new Todo({
      name: body.name,
      description: body.description,
      status: body.status,
    })

    const newTodo: ITodo = await todo.save()
    res.sendCreated("Todo added", newTodo);
  }
  catch (error){
    throw error
  }
}

const getTodos = async (req: Request, res: any): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find()
    res.sendSuccess(todos)
  } 
  catch (error) {
    throw error
  }
}

const updateTodo = async (req: Request, res: any): Promise<void> => {
  try {
    const {params: { id }, body} = req
    await Todo.findByIdAndUpdate({ _id: id }, body)
    res.sendUpdated("Todo updated", updateTodo)
  } 
  catch (error){
    throw error
  }
}

const deleteTodo = async (req: Request, res: any): Promise<void> => {
  try {
    await Todo.findByIdAndRemove(req.params.id)
    res.sendDeleted("Todo deleted")
  } 
  catch (error) {
    throw error
  }
}

export { addTodo, getTodos, updateTodo, deleteTodo };
