import React, {useContext, useState} from "react";
import {todoContext} from "../context/TodoContext";

const TodoInput = () => {
  const [text, setText] = useState("");
  const {addTodo} = useContext(todoContext);
  
  const handleAdd = () => {
    addTodo(text);
    setText("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default TodoInput;
