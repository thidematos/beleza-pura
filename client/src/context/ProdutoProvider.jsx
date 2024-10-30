import { createContext, useContext, useReducer } from "react";

const ProdutoContext = createContext();

const initials = {
  selectedFilter: "preco",
};

function reducer(state, action) {
  switch (action.type) {
    case "selectFilter":
      return { ...state, selectedFilter: action.payload };
  }
}

function ProdutoProvider({ children }) {
  const [{ selectedFilter }, dispatch] = useReducer(reducer, initials);

  function setSelectedFilter(filter) {
    dispatch({ type: "selectFilter", payload: filter });
  }

  return (
    <ProdutoContext.Provider value={{ selectedFilter, setSelectedFilter }}>
      {children}
    </ProdutoContext.Provider>
  );
}

function useProduto() {
  const context = useContext(ProdutoContext);

  return context;
}

export { ProdutoProvider, useProduto };
