import { useProduto } from "../../context/ProdutoProvider";

function Filters() {
  const { selectedFilter, setSelectedFilter } = useProduto();

  function handleChangeOnFilter(e) {
    if (!e.target.checked) return;

    setSelectedFilter(e.target.value);
  }

  return (
    <div className="col-span-2 flex flex-col items-center justify-center gap-6 pr-8">
      <h3 className="text-center">Ordenar por:</h3>
      <div className="grid grid-cols-2">
        <div className="col-span-1 grid grid-rows-3 justify-center gap-4">
          <input
            type="radio"
            id="preco"
            name="order"
            value={"preco"}
            defaultChecked={selectedFilter === "preco"}
            onChange={handleChangeOnFilter}
          />
          <input
            type="radio"
            id="validade"
            name="order"
            value={"validade"}
            defaultChecked={selectedFilter === "validade"}
            onChange={handleChangeOnFilter}
          />
          <input
            type="radio"
            id="quantidade"
            name="order"
            value={"quantidade"}
            defaultChecked={selectedFilter === "quantidade"}
            onChange={handleChangeOnFilter}
          />
        </div>
        <div className="col-span-1 grid grid-rows-3 items-center justify-center gap-4 text-sm">
          <label htmlFor="preco">Preço</label>
          <label htmlFor="validade">Validade</label>
          <label htmlFor="quantidade">Quantidade</label>
        </div>
      </div>
    </div>
  );
}

export default Filters;
