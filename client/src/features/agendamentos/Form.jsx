import Loader from "@/ui/Loader";
import { useUser } from "../login/useUser";
import Label from "@/ui/Label";
import { useGetUsers } from "../usuarios/useGetUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faChevronDown,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useAgendamento } from "@/context/AgendamentoProvider";
import Button from "@/ui/Button";
import { useGetProcedimentos } from "../procedimentos/useGetProcedimentos";
import { useEffect, useState } from "react";
import Tag from "@/ui/Tag";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useGetAgendamentos } from "./useGetAgendamentos.js";
import toast from "react-hot-toast";
import { useCreateAgendamento } from "./useCreateAgendamento";
import { useUpdateAgendamento } from "./useUpdateAgendamento";

function Form({ isUpdate = false }) {
  const { isValidating, user } = useUser();
  const {
    formMethods,
    finalSelectedProcedimentos,
    finalSelectedDate,
    setDefaultValues,
    defaultValues,
  } = useAgendamento();

  const { isGetting, usuarios } = useGetUsers();

  const { isUpdating, updateAgendamentoApi } = useUpdateAgendamento(
    isUpdate?._id,
  );

  const { isCreating, createAgendamentoFn } = useCreateAgendamento();

  useEffect(() => {
    if (!isUpdate) return;

    if (defaultValues) return;

    if (isGetting) return;

    setDefaultValues({ key: "nome", value: isUpdate.nome });
    setDefaultValues({ key: "cabelereiro", value: isUpdate.cabelereiro });
  }, [isUpdate, setDefaultValues, defaultValues, isGetting]);

  function getFormData(data) {
    console.log(data);
    if (!finalSelectedProcedimentos.length)
      return toast.error("Selecione um procedimento!");

    if (!finalSelectedDate) return toast.error("Selecione uma data e hora!");

    if (isUpdate)
      return updateAgendamentoApi({
        nome: data.nome,
        procedimentos: finalSelectedProcedimentos,
        quando: finalSelectedDate,
        cabelereiro: data.cabelereiro,
      });

    createAgendamentoFn({
      nome: data.nome,
      procedimentos: finalSelectedProcedimentos,
      quando: finalSelectedDate,
      cabelereiro: data.cabelereiro,
    });
  }

  return (
    <form onSubmit={formMethods.handleSubmit(getFormData)} className="w-full">
      {(isValidating || isCreating) && <Loader />}
      {(!isValidating || !isCreating) && (
        <div className="grid w-full grid-cols-2 gap-y-8">
          <div className="col-span-1 flex flex-col items-start justify-center gap-8">
            <div className="flex w-full flex-col items-start justify-center gap-1">
              <Label>Nome</Label>
              {user.role === "cliente" ? (
                <CurrentName />
              ) : (
                <SelectUsers isUpdate={isUpdate} />
              )}
            </div>
            <div className="flex w-full flex-col items-start justify-center gap-1">
              <Label>Procedimentos</Label>
              <SelectProcedimentos isUpdate={isUpdate} />
            </div>
            <div className="flex w-full flex-col items-start justify-center gap-1">
              <Label>Profissional de preferência</Label>
              <SelectCabelereiro isUpdate={isUpdate} />
            </div>
          </div>
          <div className="col-span-1">
            <Schedule />
          </div>
          <Button
            type="submit"
            className="col-span-2 w-[50%] select-none place-self-center"
            padding="py-2"
          >
            Agendar
          </Button>
        </div>
      )}
    </form>
  );
}

function Schedule() {
  const [startDate] = useState(new Date());

  const { isGetting, agendamentos } = useGetAgendamentos();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectedHour, setSelectedHour] = useState(null);

  const { handleChangeDate } = useAgendamento();

  useEffect(() => {
    if (!selectedHour) return;
    handleChangeDate(selectedHour);
  }, [selectedHour, handleChangeDate]);

  if (isGetting)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-3xl" />
      </div>
    );

  //const avaliableHours = agendamentos.map((item) => item?.quando?.getDate());
  const avaliableHours = Array.from({ length: 8 }).map((_, ind) =>
    new Date(selectedDate).setHours(ind + 8, 0),
  );

  const onChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <DatePicker
        selected={startDate}
        onChange={onChange}
        minDate={new Date()}
        startDate={startDate}
        inline
      />
      <div className="grid grid-flow-row grid-cols-4 gap-x-6 gap-y-4">
        <Label className="col-span-4">Horários disponíveis</Label>
        {avaliableHours.map((hour) => {
          return (
            <p
              key={hour}
              onClick={() => setSelectedHour(hour)}
              className={`${String(selectedHour) === String(hour) ? "bg-green-700" : "bg-blue-500"} col-span-1 cursor-pointer rounded-lg border border-gray-300 px-2 py-1 text-sm text-gray-50 drop-shadow-sm hover:bg-green-700`}
            >
              {new Date(hour).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          );
        })}
      </div>
    </div>
  );
}

function SelectCabelereiro({ isUpdate }) {
  const { isGetting, usuarios } = useGetUsers();
  const { isValidating, user: currentUser } = useUser();
  const { formMethods } = useAgendamento();

  if (isGetting || isValidating)
    return <FontAwesomeIcon icon={faSpinner} className="animate-spin" />;

  const cabelereirosUsers = usuarios?.filter((user) => {
    return user.role === "cabelereiro";
  });

  return (
    <select
      className="flex w-full flex-col items-start justify-center gap-1 rounded border border-gray-300 px-2 py-1 text-sm shadow outline-none"
      defaultValue={
        isUpdate
          ? isUpdate.cabelereiro
            ? isUpdate.cabelereiro
            : "qualquer"
          : "qualquer"
      }
      {...formMethods.register("cabelereiro")}
    >
      <option value={"qualquer"}>Sem preferência</option>
      {cabelereirosUsers.map((cabelereiro) => (
        <option value={cabelereiro._id} key={cabelereiro._id}>
          {cabelereiro.nome}
        </option>
      ))}
    </select>
  );
}

function SelectProcedimentos({ isUpdate }) {
  const { isPending, procedimentos } = useGetProcedimentos();
  const { handleChangeOnSelectProcedimento } = useAgendamento();
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const [selectedProcedimentos, setSelectedProcedimentos] = useState(() => {
    if (!isUpdate) return [];

    return isUpdate.procedimentos.map((id) =>
      procedimentos.find((item) => item._id === id),
    );
  });
  const [toSelectProcedimentos, setToSelectProcedimentos] = useState(() => {
    if (!isUpdate) return [];

    return procedimentos.filter((procedimento) => {
      let status = true;

      isUpdate.procedimentos.forEach((id) => {
        status = id === procedimento._id ? false : true;
      });

      return status;
    });
  });

  useEffect(() => {
    handleChangeOnSelectProcedimento(selectedProcedimentos);
  }, [selectedProcedimentos, handleChangeOnSelectProcedimento]);

  useEffect(() => {
    if (
      !procedimentos?.length > 0 ||
      toSelectProcedimentos.length > 0 ||
      selectedProcedimentos.length > 0
    )
      return;

    setToSelectProcedimentos(() => [...procedimentos]);
  }, [procedimentos, toSelectProcedimentos, selectedProcedimentos]);

  if (isPending)
    return <FontAwesomeIcon icon={faSpinner} className="animate-spin" />;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div className="relative w-full">
        <p
          className="flex w-full cursor-pointer flex-row items-center justify-between gap-1 rounded-t border border-gray-300 bg-neutral-50 py-1 pl-2 pr-1 text-sm shadow outline-none"
          onClick={() => setIsOpenDialog((state) => !state)}
        >
          <span className="select-none text-sm italic">
            Selecionar procedimentos...
          </span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="text-[10px] font-bold"
          />
        </p>
        <div
          className={`${isOpenDialog ? "visible" : "collapse"} absolute top-[100%] z-[50] w-full rounded-b border border-gray-400 bg-gray-50 shadow-lg`}
        >
          {toSelectProcedimentos.map((procedimento) => (
            <p
              className={`cursor-pointer select-none border-b border-gray-300 px-2 py-1 text-sm hover:bg-gray-200`}
              onClick={() => {
                setSelectedProcedimentos((state) => [...state, procedimento]);

                setToSelectProcedimentos((state) =>
                  state.filter(
                    (item) => item.procedimento !== procedimento.procedimento,
                  ),
                );

                setIsOpenDialog(false);
              }}
              key={procedimento._id}
            >
              {procedimento.procedimento}
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-start gap-1">
        {selectedProcedimentos.map((item) => (
          <Tag
            key={item._id}
            label={item.procedimento}
            hasDelete={() => {
              setSelectedProcedimentos((state) =>
                state.filter((tag) => tag._id !== item._id),
              );

              setIsOpenDialog(false);

              setToSelectProcedimentos((state) => [...state, item]);
            }}
          />
        ))}
      </div>
    </div>
  );
}

function CurrentName() {
  const { formMethods } = useAgendamento();
  const { user } = useUser();

  return (
    <>
      <p className="w-full">{user.nome}</p>
      <input type="hidden" {...formMethods.register("nome")} value={user._id} />
    </>
  );
}

function SelectUsers({ isUpdate }) {
  const { isGetting, usuarios } = useGetUsers();
  const { isValidating, user: currentUser } = useUser();
  const { formMethods } = useAgendamento();

  if (isGetting || isValidating)
    return (
      <FontAwesomeIcon icon={faSpinner} className="animate-spin text-lg" />
    );

  return (
    <select
      className="flex w-full flex-col items-start justify-center gap-1 rounded border border-gray-300 px-2 py-1 text-sm shadow outline-none"
      defaultValue={isUpdate ? isUpdate.nome : false}
      {...formMethods.register("nome", {
        onChange: (e) => console.log(e.target.value),
      })}
    >
      {usuarios.map((user) => (
        <option className="" key={user._id} value={user._id}>
          {user.nome}
        </option>
      ))}
    </select>
  );
}

export default Form;
