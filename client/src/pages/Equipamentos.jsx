import Create from "../features/equipamentos/Create";
import Table from "../features/equipamentos/Table";
import PageMainContainer from "../ui/PageMainContainer";
import { EquipamentoProvider } from "./../context/EquipamentoProvider";
import Filters from "./../features/equipamentos/Filters";

function Equipamentos() {
  return (
    <PageMainContainer>
      <EquipamentoProvider>
        <Filters />
        <Table />
        <Create />
      </EquipamentoProvider>
    </PageMainContainer>
  );
}

export default Equipamentos;
