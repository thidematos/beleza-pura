import { useUI } from "../../context/UIProvider";
import Button from "../../ui/Button";

import CreateForm from "./CreateForm";

function CreateNewProduto() {
  const { toggleModal } = useUI();

  return (
    <div className="relative col-span-2 flex flex-row justify-center">
      <Button
        className="fixed bottom-[10%] mx-auto"
        onClick={(e) =>
          toggleModal({ status: true, component: <CreateForm /> })
        }
      >
        Adicionar produto
      </Button>
    </div>
  );
}

export default CreateNewProduto;
