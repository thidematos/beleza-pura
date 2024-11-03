import Create from "../features/usuarios/Create";
import PageMainContainer from "../ui/PageMainContainer";
import Table from "./../features/usuarios/Table";

function Colaboradores() {
  return (
    <PageMainContainer>
      <div className="markup col-span-2"></div>
      <Table />
      <Create />
    </PageMainContainer>
  );
}

export default Colaboradores;
