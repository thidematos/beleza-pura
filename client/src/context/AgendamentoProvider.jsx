import { createContext, useCallback, useContext, useReducer } from "react";
import { useForm } from "react-hook-form";

const AgendamentoContext = createContext();

const initials = {
  finalSelectedProcedimentos: [],
  finalSelectedDate: null,
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
  }
}

export function AgendamentoProvider({ children }) {
  const [{ finalSelectedProcedimentos, finalSelectedDate }, dispatch] =
    useReducer(reducer, initials);

  const formMethods = useForm();

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
        formMethods,
        finalSelectedProcedimentos,
        finalSelectedDate,
        handleChangeOnSelectProcedimento,
        handleChangeDate,
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
