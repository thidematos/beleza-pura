import { useGetProcedimentos } from "./useGetProcedimentos";
import Loader from "../../ui/Loader";
import TableRow from "./../../ui/TableRow";
import TableColumn from "../../ui/TableColumn";
import formatPricing from "../../utils/formatPricing";
import { useProcedimento } from "../../context/ProcedimentoProvider";
import OptionsMenu from "../../ui/OptionsMenu";
import { deleteProcedimento } from "../../services/procedimentos";
import Update from "./Update";

function Table() {
  const { isPending, procedimentos } = useGetProcedimentos();

  const { filters } = useProcedimento();

  const filteredProcedimentos = procedimentos?.filter((procedimento) => {
    if (filters.produtos.length === 0) return true;

    let status = false;

    filters.produtos.forEach((id) => {
      const produtoIds = procedimento.produtos.map((produto) => produto._id);
      status = produtoIds.includes(id);
    });

    return status;
  });

  const filteredProcedimentosWithDuration = filteredProcedimentos?.filter(
    (procedimento) => {
      if (filters.duracao.length === 0) return true;

      let status = false;

      filters.duracao.forEach((intervalo) => {
        const [start, end] = [
          Number(intervalo.slice(0, 2)),
          Number(intervalo.slice(2)),
        ];
        status =
          procedimento.duracao >= start && procedimento.duracao <= end
            ? true
            : false;

        if (start === 61) status = procedimento.duracao >= start ? true : false;
      });

      return status;
    },
  );

  if (isPending)
    return (
      <div className="col-span-6 flex flex-col items-center justify-center">
        <Loader size="absolute centerXY" />
      </div>
    );

  return (
    <div className="col-span-6 flex flex-col items-center justify-start gap-6 py-10">
      <h2 className="text-lg uppercase drop-shadow-sm">Procedimentos</h2>
      <table className="grid w-full grid-cols-5 text-center">
        <thead className="col-span-5">
          <TableRow cols="grid grid-cols-5">
            <TableColumn isHead>Procedimento</TableColumn>
            <TableColumn isHead>Preço</TableColumn>
            <TableColumn isHead>Duração</TableColumn>
            <TableColumn isHead>Produtos</TableColumn>
            <TableColumn isHead>Opções</TableColumn>
          </TableRow>
        </thead>
        <tbody className="col-span-5">
          {filteredProcedimentosWithDuration
            .sort((a, b) => b.preco - a.preco)
            .map((procedimento) => (
              <TableRow
                key={procedimento._id}
                cols="grid grid-cols-5 items-center"
              >
                <TableColumn>{procedimento.procedimento}</TableColumn>
                <TableColumn>{formatPricing(procedimento.preco)}</TableColumn>
                <TableColumn>
                  <p className="space-x-2">
                    <span>
                      {Math.floor(procedimento.duracao / 60)}{" "}
                      <span className="text-sm">hr.</span>
                    </span>
                    <span>
                      {String(procedimento.duracao % 60).padStart(2, 0)}
                      <span className="text-sm"> min.</span>
                    </span>
                  </p>
                </TableColumn>
                <TableColumn>
                  <div className="flex flex-row flex-wrap items-center justify-start gap-1">
                    {procedimento.produtos.map((produto) => (
                      <p
                        key={produto._id}
                        className="flex select-none flex-row items-center justify-center rounded-full border border-gray-300 bg-green-700 px-2 py-1 text-[10px] text-gray-50 shadow"
                      >
                        {produto.produto}
                      </p>
                    ))}
                  </div>
                </TableColumn>
                <TableColumn>
                  <OptionsMenu
                    dataID={procedimento._id}
                    queryKey={"procedimentos"}
                    dataTitle={"procedimento"}
                    updateComponent={<Update procedimento={procedimento} />}
                    mutateFunction={deleteProcedimento}
                  />
                </TableColumn>
              </TableRow>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
