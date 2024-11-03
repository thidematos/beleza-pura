import Loader from "@/ui/Loader";
import { useGetUsers } from "./useGetUsers";
import Title from "@/ui/Title";
import TableRow from "@/ui/TableRow";
import TableColumn from "@/ui/TableColumn";

function Table() {
  const { isGetting, error, usuarios } = useGetUsers();

  console.log(usuarios);

  if (isGetting)
    return (
      <div className="col-span-7 flex flex-col items-center justify-start pt-[20%]">
        <Loader />
      </div>
    );

  return (
    <div className="markup col-span-6 text-center">
      <div className="flex flex-row items-center justify-center py-10">
        <Title>Usuários</Title>
      </div>
      <table className="grid grid-cols-7">
        <thead className="markup col-span-7">
          <TableRow cols="grid-cols-7">
            <TableColumn isHead>Nome</TableColumn>
            <TableColumn isHead>CPF</TableColumn>

            <TableColumn isHead>Email</TableColumn>
            <TableColumn isHead>Celular</TableColumn>
            <TableColumn isHead>Especialidades</TableColumn>
            <TableColumn isHead>Categoria</TableColumn>
            <TableColumn isHead>Opções</TableColumn>
          </TableRow>
        </thead>
      </table>
    </div>
  );
}

export default Table;
