import { useContabilidade } from "@/context/ContabilidadeProvider";
import Title from "@/ui/Title";
import { firstLetterUppercase } from "@/utils/firstLetterUppercase";

function Filters() {
  const {
    isReceita,
    toggleIsReceita,
    categorias,
    formasPagamento,
    toggleFilter,
  } = useContabilidade();

  return (
    <div className="col-span-2 flex flex-col items-center justify-start gap-6 px-[10%] pt-[15%]">
      <Title>Filtros</Title>

      <div className="flex flex-col items-center justify-center gap-1">
        <label className="switch">
          <input
            type="checkbox"
            checked={isReceita}
            onChange={() => toggleIsReceita(!isReceita)}
          />
          <span className="slider round" />
        </label>
        <h3
          className={`${isReceita ? "text-green-700" : "text-red-700"} uppercase drop-shadow-sm`}
        >
          {isReceita ? "Receita" : "Despesa"}
        </h3>
      </div>
      <div className="grid w-full grid-cols-2 gap-y-2">
        <Title fontSize="text-sm text-center col-span-2">Categoria</Title>
        <div className={`col-span-1 grid grid-flow-row items-center gap-2`}>
          {categorias[isReceita ? "receita" : "despesa"].map((categoria) => (
            <input
              type="checkbox"
              className="row-span-1"
              value={categoria}
              key={categoria}
              onChange={() => toggleFilter(categoria, "categorias")}
            />
          ))}
        </div>
        <div className={`col-span-1 grid grid-flow-row gap-2`}>
          {categorias[isReceita ? "receita" : "despesa"].map((categoria) => (
            <label className="row-span-1 text-xs" key={categoria}>
              {firstLetterUppercase(categoria)}
            </label>
          ))}
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-y-2">
        <Title fontSize="text-sm text-center col-span-2">
          Formas de pagamento
        </Title>
        <div className={`col-span-1 grid grid-flow-row items-center gap-2`}>
          {formasPagamento.map((formasPagamento) => (
            <input
              type="checkbox"
              className="row-span-1"
              value={formasPagamento}
              key={formasPagamento}
              onChange={() => toggleFilter(formasPagamento, "formasPagamento")}
            />
          ))}
        </div>
        <div className={`col-span-1 grid grid-flow-row gap-2`}>
          {formasPagamento.map((formasPagamento) => (
            <label className="row-span-1 text-xs" key={formasPagamento}>
              {firstLetterUppercase(formasPagamento)}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filters;
