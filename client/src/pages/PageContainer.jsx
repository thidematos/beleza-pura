import { Outlet } from "react-router-dom";
import Header from "../ui/Header";
import Modal from "../ui/Modal";
import { useUI } from "../context/UIProvider";

function PageContainer() {
  const { isOpenModal } = useUI();

  return (
    <div
      className={`relative w-full flex-grow ${isOpenModal ? "" : "overflow-y-scroll"}`}
    >
      <Header />
      <Outlet />
      {isOpenModal && <Modal />}
    </div>
  );
}

export default PageContainer;
