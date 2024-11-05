import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../ui/Header";
import Modal from "../ui/Modal";
import { useUI } from "../context/UIProvider";
import { EquipamentoProvider } from "../context/EquipamentoProvider";
import { AgendamentoProvider } from "@/context/AgendamentoProvider";
import { useEffect } from "react";
import { ContabilidadeProvider } from "@/context/ContabilidadeProvider";

function PageContainer() {
  const { isOpenModal } = useUI();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/overview") return;
    navigate("/overview/agendamentos");
  }, [navigate, location]);

  return (
    <div
      className={`relative w-full flex-grow ${isOpenModal ? "" : "overflow-y-scroll"}`}
    >
      <Header />
      <Outlet />
      {isOpenModal && (
        <EquipamentoProvider>
          <AgendamentoProvider>
            <ContabilidadeProvider>
              <Modal />
            </ContabilidadeProvider>
          </AgendamentoProvider>
        </EquipamentoProvider>
      )}
    </div>
  );
}

export default PageContainer;
