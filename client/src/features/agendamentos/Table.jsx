import TableRow from "@/ui/TableRow";
import { useGetProcedimentos } from "../procedimentos/useGetProcedimentos";
import { useGetUsers } from "../usuarios/useGetUsers";
import { useGetAgendamentos } from "./useGetAgendamentos";
import TableColumn from "@/ui/TableColumn";
import Title from "./../../ui/Title";
import Loader from "./../../ui/Loader";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faCalendarDays,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { firstLetterUppercase } from "@/utils/firstLetterUppercase";
import Tag from "@/ui/Tag";
import OptionsMenu from "@/ui/OptionsMenu";
import { useUser } from "../login/useUser";

function Table() {
  const { isGetting, agendamentos } = useGetAgendamentos();
  const { isGetting: isGettingUsers, usuarios } = useGetUsers();
  const { isValidating, user } = useUser();

  const { isPending: isGettingProcedimentos, procedimentos } =
    useGetProcedimentos();

  if (isGetting || isGettingUsers || isGettingProcedimentos || isValidating)
    return (
      <div className="col-span-6 flex flex-col items-center justify-start pt-[20%]">
        <Loader />
      </div>
    );

  return (
    <div className="col-span-6 space-y-6 py-10 text-center text-sm">
      <Title>Agendamentos</Title>
      <table className="grid grid-cols-6">
        <thead className="col-span-6">
          <TableRow cols=" grid-cols-6 ">
            <TableColumn isHead>Nome</TableColumn>
            <TableColumn isHead>Procedimentos</TableColumn>
            <TableColumn isHead>Profissional</TableColumn>
            <TableColumn isHead>Status</TableColumn>
            <TableColumn isHead>Agendamento</TableColumn>
            <TableColumn isHead>Opções</TableColumn>
          </TableRow>
        </thead>
        <tbody className="col-span-6">
          {agendamentos.map((schedule) => (
            <TableRow key={schedule._id} cols=" grid-cols-6 items-center ">
              <TableColumn>
                <p className="px-2">
                  {usuarios.find((user) => user._id === schedule.nome).nome}
                </p>
              </TableColumn>
              <TableColumn>
                <div className="flex w-full flex-row flex-wrap items-center justify-start gap-1">
                  {schedule.procedimentos
                    .map((item) => {
                      return procedimentos.find(
                        (procedimento) => procedimento._id === item,
                      ).procedimento;
                    })
                    .map((item) => (
                      <Tag label={item} key={item} />
                    ))}
                </div>
              </TableColumn>
              <TableColumn>
                {usuarios.find((user) => user._id === schedule.cabelereiro)
                  ?.nome || "Sem preferência"}
              </TableColumn>
              <TableColumn>
                <div>
                  {user._id === schedule.nome && <button>confirmar</button>}
                  <p
                    className={`${schedule.status === "pendente" ? "text-yellow-500" : schedule.status === "confirmado" ? "text-green-700" : "text-red-700"} font-semibold`}
                  >
                    {firstLetterUppercase(schedule.status)}
                  </p>
                </div>
              </TableColumn>
              <TableColumn>
                <div className="grid grid-cols-3">
                  <div className="col-span-1 grid grid-rows-2 items-center gap-1 text-right">
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      className="row-span-1 w-full"
                    />
                    <FontAwesomeIcon
                      icon={faClock}
                      className="row-span-1 w-full"
                    />
                  </div>
                  <div className="col-span-2 grid grid-rows-2 items-center gap-1 text-left">
                    <p className="row-span-1">
                      {format(new Date(schedule.quando), "dd/MM/yyyy")}
                    </p>
                    <p className="row-span-1">
                      {format(new Date(schedule.quando), "HH:mm")}
                    </p>
                  </div>
                </div>
              </TableColumn>
              <TableColumn>
                <OptionsMenu />
              </TableColumn>
            </TableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
