import { createContext, useContext, useReducer } from "react";

const ContabilidadeContext = createContext();

const initials = {
  isReceita: false,
  categorias: {
    despesa: [
      "pessoal",
      "aluguel e contas",
      "produtos",
      "marketing",
      "manutenção",
      "impostos e taxas",
      "outros",
    ],
    receita: ["procedimentos", "outros", "financeiro"],
  },
  formasPagamento: ["débito", "crédito", "pix", "dinheiro"],
  filters: {
    categorias: [],
    formasPagamento: [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "toggle/isReceita":
      return {
        ...state,
        isReceita: action.payload,
        filters: {
          categorias: [],
          formasPagamento: [],
        },
      };

    case "filter/categorias":
      return {
        ...state,
        filters: {
          ...state.filters,
          categorias: state.filters.categorias.includes(action.payload)
            ? state.filters.categorias.filter((item) => item !== action.payload)
            : [...state.filters.categorias, action.payload],
        },
      };

    case "filter/formasPagamento":
      return {
        ...state,
        filters: {
          ...state.filters,
          formasPagamento: state.filters.formasPagamento.includes(
            action.payload,
          )
            ? state.filters.formasPagamento.filter(
                (item) => item !== action.payload,
              )
            : [...state.filters.formasPagamento, action.payload],
        },
      };
  }
}

function ContabilidadeProvider({ children }) {
  const [{ isReceita, categorias, formasPagamento, filters }, dispatch] =
    useReducer(reducer, initials);

  function toggleFilter(status, slice) {
    dispatch({ type: `filter/${slice}`, payload: status });
  }

  function toggleIsReceita(state) {
    dispatch({ type: "toggle/isReceita", payload: state });
  }

  console.log(filters);

  return (
    <ContabilidadeContext.Provider
      value={{
        isReceita,
        filters,
        categorias,
        formasPagamento,
        toggleIsReceita,
        toggleFilter,
      }}
    >
      {children}
    </ContabilidadeContext.Provider>
  );
}

function useContabilidade() {
  const context = useContext(ContabilidadeContext);

  return context;
}

export { ContabilidadeProvider, useContabilidade };
