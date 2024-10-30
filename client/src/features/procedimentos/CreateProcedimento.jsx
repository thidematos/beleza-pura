import Button from "./../../ui/Button";
import { useUI } from "./../../context/UIProvider";
import CreateModal from "./CreateModal";

function CreateProcedimento() {
  const { toggleModal } = useUI();

  return (
    <div className="markup relative col-span-2 flex flex-col items-center">
      <Button
        onClick={() =>
          toggleModal({
            status: true,
            component: <CreateModal />,
            width: "w-[35%]",
          })
        }
        className="fixed bottom-[10%]"
      >
        Criar procedimento
      </Button>
    </div>
  );
}

export default CreateProcedimento;
