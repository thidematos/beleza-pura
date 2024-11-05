import { useProduto } from "../../context/ProdutoProvider";

function Filters() {
  const { selectedFilter, setSelectedFilter } = useProduto();

  function handleChangeOnFilter(e) {
    if (!e.target.checked) return;

    setSelectedFilter(e.target.value);
  }

  return (
    <div className="col-span-2 flex flex-col items-center justify-center gap-6 pr-8"></div>
  );
}

export default Filters;
