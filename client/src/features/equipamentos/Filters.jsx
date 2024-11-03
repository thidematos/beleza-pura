import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEquipamento } from "../../context/EquipamentoProvider";
import Loader from "../../ui/Loader";
import Title from "../../ui/Title";
import { useGetEquipamentos } from "./useGetEquipamentos";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { firstLetterUppercase } from "../../utils/firstLetterUppercase";

function Filters() {
  const { filters, toggleFilter, toggleMarca } = useEquipamento();
  const { isGetting, equipamentos } = useGetEquipamentos();

  const differentEquips = Array(
    ...new Set(equipamentos?.map((equip) => equip.equipamento.toLowerCase())),
  );

  const differentMarcas = Array(
    ...new Set(equipamentos?.map((equip) => equip.marca.toLowerCase())),
  );

  return (
    <div className="col-span-2 flex flex-col items-center justify-start gap-4 px-[20%] py-10">
      <Title>Filtros</Title>
      <p className="text-xs font-semibold">Produto</p>
      <ul className="flex max-h-32 w-full flex-col items-start gap-3 overflow-y-scroll">
        {isGetting ? (
          <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
        ) : (
          differentEquips.map((equipName) => (
            <div
              key={equipName}
              className="flex flex-row items-center justify-center gap-4 text-xs"
            >
              <input
                type="checkbox"
                value={equipName}
                onChange={(e) => toggleFilter(e.target.value)}
              />
              <li>{firstLetterUppercase(equipName)}</li>
            </div>
          ))
        )}
      </ul>
      <p className="text-xs font-semibold">Marca</p>
      <ul className="flex max-h-32 w-full flex-col items-start gap-3 overflow-y-scroll">
        {isGetting ? (
          <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
        ) : (
          differentMarcas.map((marcaName) => (
            <div
              key={marcaName}
              className="flex flex-row items-center justify-center gap-4 text-xs"
            >
              <input
                type="checkbox"
                value={marcaName}
                onChange={(e) => toggleMarca(e.target.value)}
              />
              <li>{firstLetterUppercase(marcaName)}</li>
            </div>
          ))
        )}
      </ul>
    </div>
  );
}

export default Filters;
