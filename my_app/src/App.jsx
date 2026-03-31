import PropertiesCard from "./components/property/PropertiesCard";
import PropertiesFilter from "./components/property/PropertiesFilter";
import PropertiesSearch from "./components/property/PropertiesSearch";

const App = () => {
  return (
    <div>
      {/* <h1>Todo App</h1>
      <TodoProvider>
        <TodoInput />
        <TodoList />
      </TodoProvider> */}
      <PropertiesCard/>
      <PropertiesFilter/>
      <PropertiesSearch/>
    </div>
  );
};

export default App;
