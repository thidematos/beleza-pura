import OptionsMenu from "./../../ui/OptionsMenu";
import TableColumn from "../../ui/TableColumn";
import TableRow from "../../ui/TableRow";
import Loader from "../../ui/Loader";
import { format, isBefore } from "date-fns";
import { ptBR } from "date-fns/locale";
import formatPricing from "../../utils/formatPricing";
import { useGetProdutos } from "./useGetProdutos";
import UpdateProduto from "./UpdateProduto";
import { useProduto } from "../../context/ProdutoProvider";
import { deleteProduto } from "../../services/produtos";

function ProdutosTable() {
  const [isPending, produtos] = useGetProdutos();

  const { selectedFilter } = useProduto();

  if (isPending) return <Loader size="250px" />;

  return (
    <table className="col-span-8 grid w-full grid-cols-6 place-content-start border border-gray-300">
      <thead className="col-span-6 w-full">
        <TableRow>
          <TableColumn isHead={true}>Produto</TableColumn>
          <TableColumn isHead={true}>Quantidade</TableColumn>
          <TableColumn isHead={true}>Preço</TableColumn>
          <TableColumn isHead={true}>Validade</TableColumn>
          <TableColumn isHead={true}>Opções</TableColumn>
        </TableRow>
      </thead>
      <tbody className="col-span-6">
        {produtos
          .sort((a, b) => {
            if (selectedFilter !== "validade") {
              return b[selectedFilter] - a[selectedFilter];
            }

            return isBefore(new Date(a.validade), new Date(b.validade))
              ? -1
              : 1;
          })
          .map((produto) => (
            <TableRow key={produto._id}>
              <TableColumn>{produto.produto}</TableColumn>
              <TableColumn>{produto.quantidade}</TableColumn>
              <TableColumn>{formatPricing(produto.preco)}</TableColumn>
              <TableColumn>
                {format(produto.validade, "dd / MMM / yyyy", {
                  locale: ptBR,
                })}
              </TableColumn>
              <TableColumn>
                <OptionsMenu
                  dataID={produto._id}
                  queryKey={"produtos"}
                  dataTitle="produto"
                  updateComponent={<UpdateProduto produtoID={produto._id} />}
                  mutateFunction={deleteProduto}
                />
              </TableColumn>
            </TableRow>
          ))}
      </tbody>
    </table>
  );
}

export default ProdutosTable;
