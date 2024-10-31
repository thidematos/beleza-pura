import { ProcedimentoProvider } from "../context/ProcedimentoProvider";
import CreateProcedimento from "../features/procedimentos/CreateProcedimento";
import Filters from "../features/procedimentos/Filters";
import Table from "../features/procedimentos/Table";

function Procedimentos() {
  return (
    <div className="grid grid-cols-10">
      <ProcedimentoProvider>
        <Filters />
        <Table />
        <CreateProcedimento />
      </ProcedimentoProvider>
    </div>
  );
}

export default Procedimentos;
