import { createContext, useCallback, useContext, useReducer } from "react";
import { useForm } from "react-hook-form";

const AgendamentoContext = createContext();

const initials = {
  finalSelectedProcedimentos: [],
  finalSelectedDate: null,
  defaultValues: null,
  filters: {
    status: [],
    procedimentos: [],
    profissionais: [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "form/selectProcedimento":
      return {
        ...state,
        finalSelectedProcedimentos: action.payload,
      };

    case "form/selectDate":
      return {
        ...state,
        finalSelectedDate: action.payload,
      };

    case "setDefaultValues":
      return {
        ...state,
        defaultValues: {
          ...state.defaultValues,
          [`${action.payload.key}`]: action.payload.value,
        },
      };

    case "filter/status":
      return {
        ...state,
        filters: {
          ...state.filters,
          status: state.filters.status.includes(action.payload)
            ? state.filters.status.filter((item) => item !== action.payload)
            : [...state.filters.status, action.payload],
        },
      };

    case "filter/procedimentos":
      return {
        ...state,
        filters: {
          ...state.filters,
          procedimentos: state.filters.procedimentos.includes(action.payload)
            ? state.filters.procedimentos.filter(
                (item) => item !== action.payload,
              )
            : [...state.filters.procedimentos, action.payload],
        },
      };

    case "filter/profissionais":
      return {
        ...state,
        filters: {
          ...state.filters,
          profissionais: state.filters.profissionais.includes(action.payload)
            ? state.filters.profissionais.filter(
                (item) => item !== action.payload,
              )
            : [...state.filters.profissionais, action.payload],
        },
      };
  }
}

export function AgendamentoProvider({ children }) {
  const [
    { filters, finalSelectedProcedimentos, finalSelectedDate, defaultValues },
    dispatch,
  ] = useReducer(reducer, initials);

  function toggleFilter(status, slice) {
    dispatch({ type: `filter/${slice}`, payload: status });
  }

  const setDefaultValues = useCallback(({ key, value }) => {
    dispatch({
      type: "setDefaultValues",
      payload: {
        key,
        value,
      },
    });
  }, []);

  const formMethods = useForm({
    defaultValues: defaultValues,
  });

  const handleChangeOnSelectProcedimento = useCallback(
    (selectedProcedimentos) => {
      dispatch({
        type: "form/selectProcedimento",
        payload: selectedProcedimentos,
      });
    },
    [],
  );

  const handleChangeDate = useCallback((selectedDate) => {
    dispatch({ type: "form/selectDate", payload: selectedDate });
  }, []);

  return (
    <AgendamentoContext.Provider
      value={{
        filters,
        toggleFilter,
        defaultValues,
        formMethods,
        finalSelectedProcedimentos,
        finalSelectedDate,
        handleChangeOnSelectProcedimento,
        handleChangeDate,
        setDefaultValues,
      }}
    >
      {children}
    </AgendamentoContext.Provider>
  );
}

export function useAgendamento() {
  const context = useContext(AgendamentoContext);

  return context;
}
