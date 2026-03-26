import {createContext, useState} from "react";

export const todoContext = createContext();

const TodoProvider = ({children}) => {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos([...todos, {id: Date.now(), text, completed: false}]);
  };
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const toggleTodo =(id)=>{
    setTodos(todos.map(todo=> todo.id === id ? {...todo, completed:todo.completed }: todo))
  };
  return(
    <todoContext.Provider  value={{ todos, addTodo, deleteTodo, toggleTodo }}>
        {children}
    </todoContext.Provider>
  )
};

export default TodoProvider;
