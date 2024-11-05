import { ContabilidadeProvider } from "@/context/ContabilidadeProvider";
import AsideCreate from "@/features/contabilidade/AsideCreate";
import Filters from "@/features/contabilidade/Filters";
import Table from "@/features/contabilidade/Table";
import PageMainContainer from "@/ui/PageMainContainer";

function Contabilidade() {
  return (
    <PageMainContainer>
      <ContabilidadeProvider>
        <Filters />
        <Table />
        <AsideCreate />
      </ContabilidadeProvider>
    </PageMainContainer>
  );
}

export default Contabilidade;
