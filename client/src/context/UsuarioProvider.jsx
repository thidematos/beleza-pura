import { createContext, useContext, useReducer } from "react";

const UsuarioContext = createContext();

const initials = {
  filters: {
    especialidade: [],
    categoria: [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "filter/especialidade":
      return {
        ...state,
        filters: {
          ...state.filters,
          especialidade: state.filters.especialidade.includes(action.payload)
            ? state.filters.especialidade.filter(
                (item) => item !== action.payload,
              )
            : [...state.filters.especialidade, action.payload],
        },
      };

    case "filter/categoria":
      return {
        ...state,
        filters: {
          ...state.filters,
          categoria: state.filters.categoria.includes(action.payload)
            ? state.filters.categoria.filter((item) => item !== action.payload)
            : [...state.filters.categoria, action.payload],
        },
      };
  }
}

function UsuarioProvider({ children }) {
  const [{ filters }, dispatch] = useReducer(reducer, initials);

  function toggleFilter(filter, data) {
    dispatch({
      type: `filter/${filter}`,
      payload: data,
    });
  }

  return (
    <UsuarioContext.Provider value={{ filters, toggleFilter }}>
      {children}
    </UsuarioContext.Provider>
  );
}

function useUsuario() {
  const context = useContext(UsuarioContext);

  return context;
}

export { UsuarioProvider, useUsuario };
