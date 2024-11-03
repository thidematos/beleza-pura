import { createContext, useContext, useReducer } from "react";

const EquipamentoContext = createContext();

const initials = {
  equipEnum: [
    "Pente",
    "Tesoura de corte",
    "Tesoura de desbaste",
    "Secador de cabelo",
    "Máquina de cortar cabelo",
    "Navalha",
    "Lâmina",
    "Prancha alisadora",
    "Modelador de cachos",
    "Escova",
    "Touca térmica",
    "Toalha",
    "Bacia",
  ],
  filters: {
    equipamento: [],
    marca: [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "filter/equipamento":
      return {
        ...state,
        filters: {
          ...state.filters,
          equipamento: state.filters.equipamento.includes(action.payload)
            ? state.filters.equipamento.filter(
                (equip) => equip !== action.payload,
              )
            : [...state.filters.equipamento, action.payload],
        },
      };

    case "filter/marca":
      return {
        ...state,
        filters: {
          ...state.filters,
          marca: state.filters.marca.includes(action.payload)
            ? state.filters.marca.filter((equip) => equip !== action.payload)
            : [...state.filters.marca, action.payload],
        },
      };
  }
}

function EquipamentoProvider({ children }) {
  const [{ equipEnum, filters }, dispatch] = useReducer(reducer, initials);

  function toggleFilter(filter) {
    dispatch({ type: "filter/equipamento", payload: filter });
  }

  function toggleMarca(filter) {
    dispatch({ type: "filter/marca", payload: filter });
  }

  return (
    <EquipamentoContext.Provider
      value={{ equipEnum, filters, toggleFilter, toggleMarca }}
    >
      {children}
    </EquipamentoContext.Provider>
  );
}

function useEquipamento() {
  const context = useContext(EquipamentoContext);

  return context;
}

export { EquipamentoProvider, useEquipamento };
