import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetProcedimentos } from "../procedimentos/useGetProcedimentos";
import Title from "./../../ui/Title";
import { useGetAgendamentos } from "./useGetAgendamentos";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useGetUsers } from "../usuarios/useGetUsers";
import { useAgendamento } from "@/context/AgendamentoProvider";

function Filters() {
  const { isGetting, agendamentos } = useGetAgendamentos();

  const { isPending: isGettingProcedimentos, procedimentos } =
    useGetProcedimentos();

  const { isGetting: isGettingUsers, usuarios } = useGetUsers();

  const { toggleFilter } = useAgendamento();

  const procedimentosLabel = [
    ...new Set(agendamentos?.flatMap((schedule) => schedule.procedimentos)),
  ].map((id) => procedimentos?.find((procedimento) => procedimento._id === id));

  const profissionaisLabel = [
    ...new Set(
      agendamentos
        ?.map((schedule) => schedule.cabelereiro)
        .map((id) => usuarios?.find((user) => user._id === id)),
    ),
  ];

  return (
    <div className="col-span-2 flex flex-col items-center justify-start gap-6 px-[10%] pt-[15%]">
      <Title>Filtros</Title>
      <div className="grid w-full grid-cols-2 gap-y-2">
        <Title fontSize="text-sm text-center col-span-2">Status</Title>
        <div className="col-span-1 grid grid-flow-row items-center gap-2">
          <input
            type="checkbox"
            className="row-span-1"
            value={"pendente"}
            onChange={(e) => toggleFilter(e.target.value, "status")}
          />
          <input
            type="checkbox"
            className="row-span-1"
            value={"cancelado"}
            onChange={(e) => toggleFilter(e.target.value, "status")}
          />
          <input
            type="checkbox"
            className="row-span-1"
            value={"confirmado"}
            onChange={(e) => toggleFilter(e.target.value, "status")}
          />
        </div>
        <div className="col-span-1 grid grid-flow-row items-center gap-2 text-xs">
          <label className="row-span-1 drop-shadow-sm">Pendente</label>
          <label className="row-span-1 drop-shadow-sm">Cancelado</label>
          <label className="row-span-1 drop-shadow-sm">Confirmado</label>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-y-2">
        <Title fontSize="text-sm text-center col-span-2">Procedimentos</Title>
        {isGetting || isGettingProcedimentos || isGettingUsers ? (
          <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
        ) : (
          <>
            <div className="col-span-1 grid grid-flow-row items-center gap-2">
              {procedimentosLabel.map((label) => (
                <input
                  key={label._id}
                  value={label._id}
                  type="checkbox"
                  className="row-span-1"
                  onChange={() => toggleFilter(label._id, "procedimentos")}
                />
              ))}
            </div>
            <div className="col-span-1 grid grid-flow-row items-center gap-2 text-xs">
              {procedimentosLabel.map((label) => (
                <label key={label._id} className="row-span-1 drop-shadow-sm">
                  {label.procedimento}
                </label>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="grid w-full grid-cols-2 gap-y-2">
        <Title fontSize="text-sm text-center col-span-2">Profissionais</Title>
        {isGetting || isGettingProcedimentos || isGettingUsers ? (
          <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
        ) : (
          <>
            <div className="col-span-1 grid grid-flow-row items-center gap-2">
              {profissionaisLabel.map((label) => (
                <input
                  key={label._id}
                  value={label._id}
                  type="checkbox"
                  className="row-span-1"
                  onChange={() => toggleFilter(label._id, "profissionais")}
                />
              ))}
            </div>
            <div className="col-span-1 grid grid-flow-row items-center gap-2 text-xs">
              {profissionaisLabel.map((label) => (
                <label key={label._id} className="row-span-1 drop-shadow-sm">
                  {label.nome}
                </label>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Filters;
