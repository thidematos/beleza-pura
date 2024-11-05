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
  faClipboardCheck,
  faClock,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { firstLetterUppercase } from "@/utils/firstLetterUppercase";
import Tag from "@/ui/Tag";
import OptionsMenu from "@/ui/OptionsMenu";
import { useUser } from "../login/useUser";
import { useUI } from "@/context/UIProvider";
import { useConfirmSchedule } from "./useConfirmSchedule";
import { deleteSchedule } from "@/services/agendamentos";
import ModalContainer from "./ModalContainer";
import { useAgendamento } from "@/context/AgendamentoProvider";

function Table() {
  const { isGetting, agendamentos } = useGetAgendamentos();
  const { isGetting: isGettingUsers, usuarios } = useGetUsers();
  const { isValidating, user } = useUser();

  const { filters } = useAgendamento();

  const { isPending: isGettingProcedimentos, procedimentos } =
    useGetProcedimentos();

  if (isGetting || isGettingUsers || isGettingProcedimentos || isValidating)
    return (
      <div className="col-span-6 flex flex-col items-center justify-start pt-[20%]">
        <Loader />
      </div>
    );

  const filteredAgendamentos = agendamentos
    ?.filter((schedule) => {
      let status = true;

      filters.status.forEach((item) => {
        status = item === schedule.status ? true : false;
      });

      return status;
    })
    .filter((schedule) => {
      let status = true;

      filters.procedimentos.forEach((item) => {
        status = schedule.procedimentos.includes(item);
      });

      return status;
    })
    .filter((schedule) => {
      let status = true;

      filters.profissionais.forEach((item) => {
        status = schedule.cabelereiro === item ? true : false;
      });

      return status;
    });

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
          {filteredAgendamentos.map((schedule) => (
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
                <div className="flex flex-row items-center justify-center gap-6">
                  {user._id === schedule.nome && (
                    <ConfirmSchedule schedule={schedule} />
                  )}
                  <OptionsMenu
                    dataID={schedule._id}
                    queryKey={"agendamentos"}
                    dataTitle={"agendamento"}
                    mutateFunction={deleteSchedule}
                    updateComponent={<ModalContainer isUpdate={schedule} />}
                    widthUpdate="w-[60%]"
                  />
                </div>
              </TableColumn>
            </TableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ConfirmSchedule({ schedule }) {
  const { toggleModal } = useUI();
  const { isConfirming, confirmScheduleApi } = useConfirmSchedule(schedule._id);

  return (
    <div className="">
      <button
        type="button"
        onClick={() =>
          toggleModal({
            status: true,
            component: (
              <div className="flex flex-col items-center justify-center gap-6 px-10 py-6">
                {schedule.status !== "pendente" && (
                  <div className="flex w-full flex-col items-center justify-center gap-4">
                    <p className="text-lg uppercase text-red-700 drop-shadow-sm">
                      Atenção!
                    </p>
                    <p className="w-full text-center">
                      O atendimento está{" "}
                      <span
                        className={`${schedule.status === "cancelado" ? "text-red-600" : "text-green-700"}`}
                      >
                        {schedule.status}
                      </span>
                      .
                    </p>
                    <p className="text-justify text-sm">
                      Se houver algum imprevisto e for necessária alguma
                      alteração, entre em contato com nossa secretária, por
                      favor.
                    </p>
                  </div>
                )}
                {schedule.status === "pendente" && (
                  <>
                    <div className="w-ful flex flex-col items-center justify-center gap-2">
                      <Title>Confirmação de atendimento</Title>
                      <p className="w-[80%] text-center text-sm">
                        Você deseja confirmar seu atendimento marcado para o dia
                        <span className="font-semibold text-green-700">
                          {" "}
                          {format(schedule.quando, "dd/MM/yyyy")}
                        </span>
                        , às{" "}
                        <span className="font-semibold text-green-700">
                          {format(schedule.quando, "HH:mm")}?
                        </span>
                      </p>
                    </div>

                    <div className="flex w-full flex-row items-center justify-center gap-6 text-sm">
                      {isConfirming ? (
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="animate-spin text-3xl text-green-600"
                        />
                      ) : (
                        <>
                          <button
                            className="w-[35%] rounded border border-gray-300 bg-red-800 px-4 py-2 text-gray-50 shadow hover:bg-red-600"
                            onClick={() => confirmScheduleApi("cancelado")}
                          >
                            Cancelar
                          </button>
                          <button
                            className="w-[35%] rounded border border-gray-300 bg-green-700 px-4 py-2 text-gray-50 shadow hover:bg-green-600"
                            onClick={() => confirmScheduleApi("confirmado")}
                          >
                            Confirmar
                          </button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            ),
            width: "w-[30%]",
          })
        }
      >
        <FontAwesomeIcon
          className="text-lg text-yellow-600 drop-shadow"
          icon={faClipboardCheck}
        />
      </button>
    </div>
  );
}

export default Table;
