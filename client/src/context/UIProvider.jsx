import { createContext, useContext, useReducer } from "react";

const UIContext = createContext();

const initials = {
  isOpenModal: false,
  modalContent: null,
  modalWidth: "w-auto",
};

function reducer(state, action) {
  switch (action.type) {
    case "modal/toggle":
      return {
        ...state,
        isOpenModal: action.payload.status,
        modalContent: action.payload.component || null,
        modalWidth: action.payload.width,
      };
  }
}

function UIProvider({ children }) {
  const [{ isOpenModal, modalContent, modalWidth }, dispatch] = useReducer(
    reducer,
    initials,
  );

  const toggleModal = ({ status, component, width = "w-auto" }) =>
    dispatch({
      type: "modal/toggle",
      payload: {
        status,
        component,
        width,
      },
    });

  return (
    <UIContext.Provider
      value={{ isOpenModal, toggleModal, modalContent, modalWidth }}
    >
      {children}
    </UIContext.Provider>
  );
}

function useUI() {
  const context = useContext(UIContext);

  return context;
}

export { UIProvider, useUI };
