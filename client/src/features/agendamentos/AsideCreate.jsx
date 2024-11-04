import { useUI } from "@/context/UIProvider";
import Button from "@/ui/Button";
import ModalContainer from "./ModalContainer";
import { createPortal } from "react-dom";

function AsideCreate() {
  const { toggleModal } = useUI();

  return (
    <div className="col-span-2 flex flex-row justify-center">
      <Button
        className="fixed bottom-[10%]"
        padding="py-4 px-10"
        onClick={() =>
          toggleModal({
            status: true,
            component: <ModalContainer />,
            width: "w-[65%]",
          })
        }
      >
        Agendar
      </Button>
    </div>
  );
}

export default AsideCreate;
