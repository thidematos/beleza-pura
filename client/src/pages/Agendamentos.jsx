import { AgendamentoProvider } from "@/context/AgendamentoProvider";
import AsideCreate from "@/features/agendamentos/AsideCreate";
import Table from "./../features/agendamentos/Table";
import PageMainContainer from "@/ui/PageMainContainer";
import Filters from "@/features/agendamentos/Filters";

function Agendamentos() {
  return (
    <AgendamentoProvider>
      <PageMainContainer id={"agendamento-container"}>
        <Filters />
        <Table />
        <AsideCreate />
      </PageMainContainer>
    </AgendamentoProvider>
  );
}

export default Agendamentos;
