import Title from "@/ui/Title";
import { useGetUsers } from "./useGetUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { firstLetterUppercase } from "@/utils/firstLetterUppercase";
import { useUsuario } from "@/context/UsuarioProvider";

function Filter() {
  const { isGetting, usuarios } = useGetUsers();
  const { toggleFilter } = useUsuario();

  const especialidades = [
    ...new Set(
      usuarios
        ?.map((user) => user.especialidades)
        ?.map((especialidade) => especialidade),
    ),
  ].flatMap((item) => item);

  const categorias = [...new Set(usuarios?.map((user) => user.role))];

  return (
    <div className="col-span-2 flex flex-col items-center justify-start gap-6 py-10">
      <Title>Filtros</Title>
      <div className="grid w-full grid-cols-2">
        {isGetting ? (
          <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xl" />
        ) : (
          <>
            <Title fontSize="text-xs col-span-2 text-center pb-6">
              Especialidade
            </Title>
            <div className="col-span-1 grid grid-flow-row items-center justify-end gap-2 pr-[25%]">
              {especialidades.map((especialidade) => (
                <input
                  type="checkbox"
                  key={especialidade}
                  onChange={() => toggleFilter("especialidade", especialidade)}
                />
              ))}
            </div>
            <div className="cols-span-1 grid grid-flow-row gap-2">
              {especialidades.map((especialidade) => (
                <label className="text-xs" key={especialidade}>
                  {firstLetterUppercase(especialidade)}
                </label>
              ))}
            </div>
            <Title fontSize="text-xs col-span-2 text-center py-6">
              Categoria
            </Title>
            <div className="col-span-1 grid grid-flow-row items-center justify-end pr-[25%]">
              {categorias.map((categoria) => (
                <input
                  type="checkbox"
                  key={categoria}
                  onChange={() => toggleFilter("categoria", categoria)}
                />
              ))}
            </div>
            <div className="cols-span-1 grid grid-flow-row">
              {categorias.map((categoria) => (
                <label className="text-xs" key={categoria}>
                  {firstLetterUppercase(categoria)}
                </label>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Filter;
