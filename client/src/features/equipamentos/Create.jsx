import Button from "./../../ui/Button";
import { useUI } from "./../../context/UIProvider";
import CreateModal from "./CreateModal";

function Create() {
  const { toggleModal } = useUI();

  return (
    <div className="col-span-2 flex flex-col items-center justify-center">
      <Button
        className="fixed bottom-[10%]"
        onClick={() => {
          toggleModal({
            status: true,
            component: <CreateModal />,
            width: "w-[40%]",
          });
        }}
      >
        Adicionar equipamento
      </Button>
    </div>
  );
}

export default Create;
