import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FormInput from "../../ui/FormInput";
import Loader from "../../ui/Loader";

import { useCreateProduto } from "./useCreateProduto";
import ProdutoForm from "./ProdutoForm";

function CreateForm() {
  const { isPending, newProduto } = useCreateProduto();

  return (
    <div className="flex flex-col items-center justify-center gap-16 p-10">
      <h2 className="text-lg uppercase drop-shadow-sm">
        Cadastrar novo produto
      </h2>
      {isPending ? (
        <Loader size="100px" />
      ) : (
        <ProdutoForm mutate={newProduto} useValues={false} />
      )}
    </div>
  );
}

export default CreateForm;
