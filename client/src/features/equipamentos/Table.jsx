import Loader from "../../ui/Loader";
import { useGetEquipamentos } from "./useGetEquipamentos";
import Title from "./../../ui/Title";
import TableRow from "./../../ui/TableRow";
import TableColumn from "./../../ui/TableColumn";
import OptionsMenu from "./../../ui/OptionsMenu";
import formatPricing from "./../../utils/formatPricing";
import { useEquipamento } from "../../context/EquipamentoProvider";
import { deleteEquipamento } from "../../services/equipamentos";
import Update from "./Update";
import { format } from "date-fns";

function Table() {
  const { isGetting, equipamentos } = useGetEquipamentos();
  const { filters } = useEquipamento();

  if (isGetting)
    return (
      <div className="col-span-6">
        <Loader size="absolute centerXY" />
      </div>
    );

  const equipamentosOrdered = equipamentos.sort((a, b) => b.preco - a.preco);

  const equipamentoFiltered = equipamentosOrdered.filter((equip) => {
    if (filters.equipamento.length === 0) return true;

    const lower = equip.equipamento.toLowerCase();

    return filters.equipamento.includes(lower);
  });

  const equipamentoFiltered2 = equipamentoFiltered.filter((equip) => {
    if (filters.marca.length === 0) return true;

    const lower = equip.marca.toLowerCase();

    return filters.marca.includes(lower);
  });

  return (
    <div className="col-span-6 flex flex-col items-center justify-center py-10">
      <Title>Equipamentos</Title>
      <table className="w-full grid-cols-5 items-center justify-center text-center">
        <thead className="">
          <TableRow cols={"grid-cols-5"}>
            <TableColumn isHead>Equipamento</TableColumn>
            <TableColumn isHead>Marca</TableColumn>
            <TableColumn isHead>Voltagem</TableColumn>
            <TableColumn isHead>Data de Aquisição</TableColumn>
            <TableColumn isHead>Opções</TableColumn>
          </TableRow>
        </thead>
        <tbody className="">
          {equipamentoFiltered2.length === 0 ? (
            <tr className="w-full">
              <p className="py-10 italic text-red-700 drop-shadow-sm">
                Não há resultados para a pesquisa
              </p>
            </tr>
          ) : (
            equipamentoFiltered2.map((equipamento) => (
              <TableRow key={equipamento._id} cols="grid-cols-5">
                <TableColumn>{equipamento.equipamento}</TableColumn>
                <TableColumn>{equipamento.marca}</TableColumn>
                <TableColumn>{equipamento.voltagem}</TableColumn>
                <TableColumn>
                  {equipamento.dataAquisicao &&
                    format(equipamento.dataAquisicao, "dd/MM/yyyy")}
                </TableColumn>

                <TableColumn>
                  <OptionsMenu
                    queryKey={"equipamentos"}
                    dataID={equipamento._id}
                    dataTitle={"equipamento"}
                    mutateFunction={deleteEquipamento}
                    updateComponent={<Update equipamento={equipamento} />}
                  />
                </TableColumn>
              </TableRow>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
