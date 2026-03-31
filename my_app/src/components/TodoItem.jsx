import React, { useContext } from 'react'
import { todoContext } from '../context/TodoContext'

const TodoItem = ({todo}) => {
    const {deleteTodo,toggleTodo}=useContext(todoContext);
  return (
      <div style={{ margin: "10px 0" }}>
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          marginRight: "10px"
        }}
      >
        {todo.text}
      </span>

      <button onClick={() => toggleTodo(todo.id)}>
        {todo.completed ? "Undo" : "Done"}
      </button>

      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  )
}

export default TodoItem
