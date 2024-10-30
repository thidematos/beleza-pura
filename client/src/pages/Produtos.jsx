import { useQuery } from "@tanstack/react-query";
import CreateNewProduto from "../features/produtos/CreateNewProduto";
import ProdutosTable from "../features/produtos/ProdutosTable";
import { getAllProdutos } from "../services/produtos";
import Loader from "../ui/Loader";
import Filters from "../features/produtos/Filters";
import { ProdutoProvider } from "../context/ProdutoProvider";

function Produtos() {
  const {
    isPending,
    data: produtos,
    error,
  } = useQuery({
    queryKey: ["produtos"],
    queryFn: getAllProdutos,
  });

  if (isPending)
    return (
      <div className="flex h-full w-full flex-row items-start justify-center pt-16">
        <Loader />
      </div>
    );

  return (
    <div className="grid grid-cols-12 py-16">
      <ProdutoProvider>
        <Filters />
        <ProdutosTable />
        <CreateNewProduto />
      </ProdutoProvider>
    </div>
  );
}

export default Produtos;
