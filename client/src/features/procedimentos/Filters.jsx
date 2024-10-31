import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetProdutos } from "../produtos/useGetProdutos";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useProcedimento } from "../../context/ProcedimentoProvider";

function Filters() {
  return (
    <div className="col-span-2 flex flex-col items-center justify-start gap-6 px-8 py-10">
      <p className="uppercase">Filtros</p>
      <Duracao />
      <Produtos />
    </div>
  );
}

function Produtos() {
  const [isPending, produtos] = useGetProdutos();

  const { toggleProdutoFilter } = useProcedimento();

  return (
    <div className="grid w-full grid-cols-3">
      {isPending ? (
        <div className="col-span-3 flex flex-row items-center justify-center">
          <FontAwesomeIcon
            icon={faSpinner}
            className="animate-spin text-center text-xl text-green-900 drop-shadow-sm"
          />
        </div>
      ) : (
        <>
          <p className="col-span-3 pb-4 text-center text-xs font-semibold">
            Produtos
          </p>
          <div className="col-span-1 grid grid-rows-5 items-center justify-center gap-3">
            {produtos.map((produto) => (
              <div key={produto._id} className="row-span-1">
                <input
                  type="checkbox"
                  id={produto._id}
                  onChange={() => toggleProdutoFilter(produto._id)}
                />
              </div>
            ))}
          </div>
          <div className="col-span-2 grid grid-rows-5 items-center gap-3 text-xs">
            {produtos.map((produto) => (
              <label
                key={produto._id}
                className="row-span-1 select-none"
                htmlFor={produto._id}
              >
                {produto.produto}
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Duracao() {
  const { toggleDuracaoFilter } = useProcedimento();

  return (
    <div className="grid w-full grid-cols-3 pb-4">
      <p className="col-span-3 pb-4 text-center text-xs font-semibold">
        Duração
      </p>
      <div className="col-span-1 grid grid-rows-4 items-center justify-center gap-3">
        <div className="row-span-1">
          <input
            type="checkbox"
            id="15-30"
            value={JSON.stringify([15, 30])}
            onChange={(e) => toggleDuracaoFilter(JSON.parse(e.target.value))}
          />
        </div>

        <div className="row-span-1">
          <input
            type="checkbox"
            id="30-45"
            value={JSON.stringify([31, 45])}
            onChange={(e) => toggleDuracaoFilter(JSON.parse(e.target.value))}
          />
        </div>

        <div className="row-span-1">
          <input
            type="checkbox"
            id="45-60"
            value={JSON.stringify([46, 60])}
            onChange={(e) => toggleDuracaoFilter(JSON.parse(e.target.value))}
          />
        </div>
        <div className="row-span-1">
          <input
            type="checkbox"
            id="more60"
            value={JSON.stringify([61])}
            onChange={(e) => toggleDuracaoFilter(JSON.parse(e.target.value))}
          />
        </div>
      </div>
      <div className="col-span-2 grid grid-rows-4 items-center gap-3 text-xs">
        <label className="row-span-1 select-none" htmlFor="15-30">
          15 min. - 30 min.
        </label>
        <label className="row-span-1 select-none" htmlFor="30-45">
          30 min. - 45 min.
        </label>
        <label className="row-span-1 select-none" htmlFor="45-60">
          45 min. - 1 hr.
        </label>
        <label className="row-span-1 select-none" htmlFor="more60">
          mais de 1 hr.
        </label>
      </div>
    </div>
  );
}

export default Filters;
