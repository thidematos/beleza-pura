import Create from "../features/usuarios/Create";
import PageMainContainer from "../ui/PageMainContainer";
import Table from "./../features/usuarios/Table";
import Filters from "./../features/usuarios/Filters";
import { UsuarioProvider } from "@/context/UsuarioProvider";

function Colaboradores() {
  return (
    <PageMainContainer>
      <UsuarioProvider>
        <Filters />
        <Table />
        <Create />
      </UsuarioProvider>
    </PageMainContainer>
  );
}

export default Colaboradores;
