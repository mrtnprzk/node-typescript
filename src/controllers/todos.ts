import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
    const text = (req.body as {text: string}).text;
    const newTodo = new Todo(Math.random().toString(), text);

    TODOS.push(newTodo);

    res.status(201).json({ message: "Created the todo.", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
    res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {
    const todoId = req.params.id;

    const updatedText = (req.body as {text: string}).text;

    const todoIndnex = TODOS.findIndex(todo => todo.id === todoId);

    if (todoIndnex < 0) {
        throw new Error("Could not find Todo!");
    }

    TODOS[todoIndnex] = new Todo(TODOS[todoIndnex].id, updatedText);

    res.json({ message: "Updated!", updatedTodo: TODOS[todoIndnex] });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  const todoId = req.params.id;

  const todoIndnex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndnex < 0) {
    throw new Error("Could not find Todo!");
  }

  TODOS.splice(todoIndnex, 1);

  res.json({message: "Todo Deleted!"})
};