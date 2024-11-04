import Button from "../../ui/Button";
import { useUI } from "../../context/UIProvider";
import CreateModal from "./CreteModal";

function Create() {
  const { toggleModal } = useUI();

  return (
    <div className="col-span-2 flex flex-col items-center">
      <Button
        className="fixed bottom-[10%]"
        onClick={() =>
          toggleModal({
            status: true,
            component: <CreateModal />,
            width: "w-[45%]",
          })
        }
      >
        Criar usuário
      </Button>
    </div>
  );
}

export default Create;
