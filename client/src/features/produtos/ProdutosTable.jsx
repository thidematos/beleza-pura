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
import Title from "../../ui/Title";

function ProdutosTable() {
  const [isPending, produtos] = useGetProdutos();

  const { selectedFilter } = useProduto();

  if (isPending) return <Loader size="250px" />;

  return (
    <div className="col-span-8 flex flex-col items-center justify-start gap-6">
      <Title>Produtos</Title>
      <table className="grid w-full grid-cols-6 items-center border border-gray-300 text-center">
        <thead className="col-span-6 w-full">
          <TableRow>
            <TableColumn isHead={true}>Produto</TableColumn>
            <TableColumn isHead={true}>Marca</TableColumn>
            <TableColumn isHead={true}>Peso Líquido</TableColumn>
            <TableColumn isHead={true}>Descrição</TableColumn>
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
                <TableColumn>{produto.marca}</TableColumn>
                <TableColumn>{produto.pesoLiquido}</TableColumn>
                <TableColumn>{produto.descricao}</TableColumn>
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
    </div>
  );
}

export default ProdutosTable;
