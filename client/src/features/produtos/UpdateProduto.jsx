import { format } from "date-fns";
import Loader from "../../ui/Loader";
import ProdutoForm from "./ProdutoForm";
import { useGetProdutos } from "./useGetProdutos";
import { useUpdateProduto } from "./useUpdateProduto";

function UpdateProduto({ produtoID }) {
  const [isPending, produtos] = useGetProdutos();

  const currentProduto = produtos.find((produto) => produto._id === produtoID);

  const { isPending: isUpdating, updateProdutoFn } =
    useUpdateProduto(produtoID);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 px-12 py-8">
      <p className="text-lg uppercase drop-shadow-sm">
        Atualizar dados do produto
      </p>
      {isPending || isUpdating ? (
        <Loader />
      ) : (
        <ProdutoForm
          mutate={updateProdutoFn}
          useValues={{
            produto: currentProduto.produto,
            qtd: currentProduto.quantidade,
            preco: currentProduto.preco,
            validade: format(currentProduto.validade, "yyyy-MM-dd"),
          }}
        />
      )}
    </div>
  );
}

export default UpdateProduto;
