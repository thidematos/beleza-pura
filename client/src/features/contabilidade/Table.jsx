import TableRow from "@/ui/TableRow";
import { useGetContabilidade } from "./useGetContabilidade";
import TableColumn from "@/ui/TableColumn";
import { useState } from "react";
import { firstLetterUppercase } from "@/utils/firstLetterUppercase";
import formatPricing from "@/utils/formatPricing";
import OptionsMenu from "@/ui/OptionsMenu";
import { deleteContabilidade } from "@/services/contabilidade";
import { useContabilidade } from "@/context/ContabilidadeProvider";
import Title from "./../../ui/Title";
import { format } from "date-fns";
import Loader from "@/ui/Loader";
import ModalContainer from "./ModalContainer";
import Form from "./Form";

function Table() {
  const { isGetting, contabilidades } = useGetContabilidade();

  const { isReceita, filters } = useContabilidade();

  if (isGetting)
    return (
      <div className="col-span-6 flex flex-col items-center justify-start pt-[20%]">
        <Loader />
      </div>
    );

  const filteredContabilidades = contabilidades
    .filter((registro) => registro.tipo === (isReceita ? "receita" : "despesa"))
    .filter((registro) => {
      let status = true;

      filters.categorias.forEach((item) => {
        status = item === registro.categoria ? true : false;
      });

      return status;
    })
    .filter((registro) => {
      let status = true;

      filters.formasPagamento.forEach((item) => {
        status = item === registro.formaPagamento ? true : false;
      });

      return status;
    });

  console.log(filteredContabilidades);

  return (
    <div className="col-span-6 flex flex-col items-center justify-start gap-4 py-10">
      <Title>Registros contábeis</Title>
      <table className="grid grid-cols-6">
        <thead className="col-span-6 text-center">
          <TableRow cols="grid-cols-6 items-center">
            <TableColumn isHead>Descrição</TableColumn>
            <TableColumn isHead>Valor</TableColumn>
            <TableColumn isHead>Categoria</TableColumn>
            <TableColumn isHead>Forma de pagamento</TableColumn>
            <TableColumn isHead>Data</TableColumn>
            <TableColumn isHead>Opções</TableColumn>
          </TableRow>
        </thead>
        <tbody className="col-span-6 text-center">
          {filteredContabilidades.map((registro) => (
            <TableRow key={registro._id} cols="grid-cols-6 items-center">
              <TableColumn>{registro.descricao}</TableColumn>
              <TableColumn>
                <span
                  className={`${isReceita ? "text-green-700" : "text-red-700"}`}
                >
                  {formatPricing(registro.valor)}
                </span>
              </TableColumn>
              <TableColumn>
                {firstLetterUppercase(registro.categoria)}
              </TableColumn>
              <TableColumn>
                {firstLetterUppercase(registro.formaPagamento)}
              </TableColumn>
              <TableColumn>
                {format(registro.createdAt, "dd/MM/yyyy")}
              </TableColumn>
              <TableColumn>
                <OptionsMenu
                  dataID={registro._id}
                  queryKey={"contabilidade"}
                  dataTitle={"contabilidade"}
                  mutateFunction={deleteContabilidade}
                  updateComponent={
                    <ModalContainer isUpdate={true}>
                      <Form isUpdate={registro} />
                    </ModalContainer>
                  }
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
