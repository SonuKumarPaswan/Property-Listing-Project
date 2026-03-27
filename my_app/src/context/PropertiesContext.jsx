import {createContext, useEffect, useState} from "react";

const PropetiesContext = createContext();

const PropertiesProvider = ({children}) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({});
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://fakerapi.it/api/v2/addresses?_quantity=1",
      );
      const data = await res.json();
      console.log(data);
      setProperties(data.data);
    } catch (error) {
      console.error("Fetch Property ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [search, filter]);

  return (
    <PropetiesContext.Provider
      value={{
        search,
        setSearch,
        filter,
        setFilter,
        loading,
        setLoading,
        properties,
      }}
    >
      {children}
    </PropetiesContext.Provider>
  );
};

export {PropetiesContext, PropertiesProvider};
