import Loader from "@/ui/Loader";
import { useGetUsers } from "./useGetUsers";
import Title from "@/ui/Title";
import TableRow from "@/ui/TableRow";
import TableColumn from "@/ui/TableColumn";
import { coverCPF } from "@/utils/coverCPF";
import OptionsMenu from "@/ui/OptionsMenu";
import { firstLetterUppercase } from "@/utils/firstLetterUppercase";
import { deleteUsuario } from "@/services/usuarios";
import Tag from "@/ui/Tag";
import Update from "./Update";
import Form from "./Form";
import { useUsuario } from "@/context/UsuarioProvider";
import { formatCel } from "@/utils/formatCel";

function Table() {
  const { isGetting, usuarios } = useGetUsers();

  const { filters } = useUsuario();

  if (isGetting)
    return (
      <div className="col-span-7 flex flex-col items-center justify-start pt-[20%]">
        <Loader />
      </div>
    );

  const sortedUsuarios = usuarios
    .filter((user) => {
      if (filters.especialidade.length === 0) return true;
      let state = false;

      filters.especialidade.forEach((filter) => {
        state = user.especialidades.includes(filter);
      });

      return state;
    })
    .filter((user) => {
      if (filters.categoria.length === 0) return true;
      let state = false;

      filters.categoria.forEach((filter) => {
        state = user.role.includes(filter);
      });

      return state;
    });

  return (
    <div className="col-span-6 text-center">
      <div className="flex flex-row items-center justify-center py-10">
        <Title>Usuários</Title>
      </div>
      <table className="grid grid-cols-7">
        <thead className="col-span-7">
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
        <tbody className="col-span-7 text-xs">
          {sortedUsuarios.map((user) => (
            <TableRow key={user._id} cols="grid-cols-7 place-items-center">
              <TableColumn>{user.nome}</TableColumn>
              <TableColumn>{coverCPF(user.cpf)}</TableColumn>
              <TableColumn>{user.email}</TableColumn>
              <TableColumn>{formatCel(user.celular)}</TableColumn>
              <TableColumn>
                <div className="flex flex-row flex-wrap items-center justify-start gap-1">
                  {user.especialidades.length === 0
                    ? "-"
                    : user.especialidades.map((especialidade) => (
                        <Tag key={especialidade} label={especialidade} />
                      ))}
                </div>
              </TableColumn>
              <TableColumn>{firstLetterUppercase(user.role)}</TableColumn>
              <TableColumn>
                <OptionsMenu
                  dataID={user._id}
                  queryKey={"usuarios"}
                  dataTitle={"usuário"}
                  mutateFunction={deleteUsuario}
                  updateComponent={
                    <Update>
                      <Form isUpdate={user} />
                    </Update>
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
