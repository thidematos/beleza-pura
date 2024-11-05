import { useUI } from "@/context/UIProvider";
import Button from "./../../ui/Button";
import ModalContainer from "./ModalContainer";
import Form from "./Form";

function AsideCreate() {
  const { toggleModal } = useUI();

  return (
    <div className="col-span-2 flex flex-col items-center">
      <Button
        className="fixed bottom-[10%]"
        onClick={() =>
          toggleModal({
            status: true,
            component: (
              <ModalContainer>
                <Form />
              </ModalContainer>
            ),
            width: "",
          })
        }
      >
        Criar registro
      </Button>
    </div>
  );
}

export default AsideCreate;
