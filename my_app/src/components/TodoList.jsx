import React, {useContext} from "react";
import {todoContext} from "../context/TodoContext";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const {todos} = useContext(todoContext);
  return (
    <div>
      {todos.length === 0 ? (
        <div>No Todo</div>
      ) : (
        todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      )}
    </div>
  );
};

export default TodoList;
