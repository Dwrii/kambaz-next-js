"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { ListGroupItem, Button, FormControl } from "react-bootstrap";

interface Todo {
  id: string;
  title: string;
}

interface RootState {
  todosReducer: { todo: Todo };
}

export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <ListGroupItem>
      <div className="d-flex gap-2 align-items-center">
        <FormControl
          defaultValue={todo.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setTodo({ ...todo, title: e.target.value }))
          }
        />
        <Button
          variant="warning"
          id="wd-update-todo-click"
          onClick={() => dispatch(updateTodo(todo))}
        >
          Update
        </Button>
        <Button
          variant="success"
          id="wd-add-todo-click"
          onClick={() => dispatch(addTodo(todo))}
        >
          Add
        </Button>
      </div>
    </ListGroupItem>
  );
}
