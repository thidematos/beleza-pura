import { Outlet } from "react-router-dom";
import Header from "../ui/Header";
import Modal from "../ui/Modal";
import { useUI } from "../context/UIProvider";
import { EquipamentoProvider } from "../context/EquipamentoProvider";
import { AgendamentoProvider } from "@/context/AgendamentoProvider";

function PageContainer() {
  const { isOpenModal } = useUI();

  return (
    <div
      className={`relative w-full flex-grow ${isOpenModal ? "" : "overflow-y-scroll"}`}
    >
      <Header />
      <Outlet />
      {isOpenModal && (
        <EquipamentoProvider>
          <AgendamentoProvider>
            <Modal />
          </AgendamentoProvider>
        </EquipamentoProvider>
      )}
    </div>
  );
}

export default PageContainer;
