import { createContext, useContext, useReducer } from "react";

const UIContext = createContext();

const initials = {
  isOpenModal: false,
  modalContent: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "modal/toggle":
      return {
        ...state,
        isOpenModal: action.payload.status,
        modalContent: action.payload.component || null,
      };
  }
}

function UIProvider({ children }) {
  const [{ isOpenModal, modalContent }, dispatch] = useReducer(
    reducer,
    initials,
  );

  const toggleModal = ({ status, component }) =>
    dispatch({
      type: "modal/toggle",
      payload: {
        status,
        component,
      },
    });

  return (
    <UIContext.Provider value={{ isOpenModal, toggleModal, modalContent }}>
      {children}
    </UIContext.Provider>
  );
}

function useUI() {
  const context = useContext(UIContext);

  return context;
}

export { UIProvider, useUI };
