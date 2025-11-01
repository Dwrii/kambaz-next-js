"use client";
import { useState } from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function ArrayStateVariable() {
  const { todos } = useSelector((state: { todosReducer: { todos: { id: string; title: string }[] } }) => state.todosReducer);
  const [array, setArray] = useState<number[]>([1, 2, 3, 4, 5]);

  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  const deleteElement = (index: number) => {
    setArray(array.filter((_, i) => i !== index));
  };

  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>

      <Button
        variant="success"
        onClick={addElement}
        id="wd-add-element-click"
        className="mb-2"
      >
        Add Element
      </Button>

      <ul className="list-unstyled">
        {array.map((item, index) => (
          <li
            key={index}
            className="d-flex justify-content-between align-items-center border rounded p-2 mb-1"
          >
            <span>{item}</span>
            <Button
              variant="danger"
              size="sm"
              onClick={() => deleteElement(index)}
              id={`wd-delete-element-${index}-click`}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>

      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id}>{todo.title}</ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
