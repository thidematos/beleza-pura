import { ProcedimentoProvider } from "../context/ProcedimentoProvider";
import CreateProcedimento from "../features/procedimentos/CreateProcedimento";
import Filters from "../features/procedimentos/Filters";
import Table from "../features/procedimentos/Table";
import PageMainContainer from "../ui/PageMainContainer";

function Procedimentos() {
  return (
    <PageMainContainer>
      <ProcedimentoProvider>
        <Filters />
        <Table />
        <CreateProcedimento />
      </ProcedimentoProvider>
    </PageMainContainer>
  );
}

export default Procedimentos;
