import { createContext, useContext, useReducer } from "react";

const ProcedimentoContext = createContext();

const initials = {
  filters: {
    duracao: [],
    produtos: [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "filter/produto":
      return {
        ...state,
        filters: {
          ...state.filters,
          produtos: action.payload.hasFilter
            ? state.filters.produtos.filter(
                (id) => id !== action.payload.produtoID,
              )
            : [...state.filters.produtos, action.payload.produtoID],
        },
      };

    case "filter/duracao":
      return {
        ...state,
        filters: {
          ...state.filters,
          duracao: "teste",
        },
      };
  }
}

function ProcedimentoProvider({ children }) {
  const [{ filters }, dispatch] = useReducer(reducer, initials);

  function toggleDuracaoFilter() {}

  function toggleProdutoFilter(produtoID) {
    dispatch({
      type: "filter/produto",
      payload: {
        hasFilter: filters.produtos.includes(produtoID),
        produtoID: produtoID,
      },
    });
  }

  return (
    <ProcedimentoContext.Provider value={{ filters, toggleProdutoFilter }}>
      {children}
    </ProcedimentoContext.Provider>
  );
}

function useProcedimento() {
  const context = useContext(ProcedimentoContext);

  return context;
}

export { ProcedimentoProvider, useProcedimento };
