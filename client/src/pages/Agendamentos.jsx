import { AgendamentoProvider } from "@/context/AgendamentoProvider";
import AsideCreate from "@/features/agendamentos/AsideCreate";
import Table from "./../features/agendamentos/Table";
import PageMainContainer from "@/ui/PageMainContainer";

function Agendamentos() {
  return (
    <AgendamentoProvider>
      <PageMainContainer id={"agendamento-container"}>
        <div className="markup col-span-2">Filter Dummy</div>
        <Table />
        <AsideCreate />
      </PageMainContainer>
    </AgendamentoProvider>
  );
}

export default Agendamentos;
