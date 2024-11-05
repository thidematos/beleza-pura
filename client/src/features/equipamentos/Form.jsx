import { useState } from "react";
import { useEquipamento } from "../../context/EquipamentoProvider";
import Button from "./../../ui/Button";
import useCreateEquipamento from "./useCreateEquipamento";
import toast from "react-hot-toast";
import Loader from "../../ui/Loader";
import { useUpdateEquipamento } from "./useUpdateEquipamento";
import { firstLetterUppercase } from "../../utils/firstLetterUppercase";
import { format } from "date-fns";

const labelStyle = `w-[50%] uppercase`;

function Form({ isUpdate = false }) {
  const { equipEnum } = useEquipamento();

  const { isCreating, createEquipamentoFn } = useCreateEquipamento();
  const { isUpdating, updateEquipamentoFn } = useUpdateEquipamento(isUpdate.id);

  const [equipamento, setEquipamento] = useState(() =>
    isUpdate ? isUpdate.equipamento : "",
  );
  const [voltagem, setVoltagem] = useState(() =>
    isUpdate ? isUpdate.voltagem : "",
  );
  const [dataAquisicao, setDataAquisicao] = useState(() =>
    isUpdate
      ? format(isUpdate.dataAquisicao, "yyyy-MM-dd")
      : format(new Date(), "yyyy-MM-dd"),
  );
  const [marca, setMarca] = useState(() => (isUpdate ? isUpdate.marca : ""));

  const [isOutro, setIsOutro] = useState(false);

  return (
    <form
      className="items-between flex w-full flex-col justify-center gap-6"
      onSubmit={(e) => {
        e.preventDefault();

        if (!equipamento)
          return toast.error("Por favor, selecione um equipamento");

        if (isUpdate) {
          return updateEquipamentoFn({
            equipamento,
            voltagem,
            dataAquisicao,
            marca,
          });
        } else {
          return createEquipamentoFn({
            equipamento,
            voltagem,
            dataAquisicao,
            marca,
          });
        }
      }}
    >
      {isCreating || isUpdating ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-row items-center justify-between">
            <label className={labelStyle} htmlFor="equipamento">
              Equipamento
            </label>
            <div className="relative flex w-[50%] flex-col items-center justify-center gap-3">
              <select
                className="w-full rounded border border-gray-300 p-1 text-sm shadow-sm outline-none"
                id="equipamento"
                defaultValue={equipamento.toLowerCase()}
                onChange={(e) => {
                  setEquipamento("");
                  const isOutro = e.target.value === "outro";

                  if (!isOutro) {
                    setEquipamento(firstLetterUppercase(e.target.value));
                    setIsOutro(false);
                    return;
                  }

                  setIsOutro(true);
                }}
              >
                {equipEnum.map((equip) => (
                  <option
                    className="text-xs"
                    value={equip.toLowerCase()}
                    key={equip}
                  >
                    {equip}
                  </option>
                ))}
                <option className="text-xs" value={"outro"}>
                  Outro:
                </option>
              </select>
              {isOutro && (
                <input
                  type="text"
                  placeholder="Outro equipamento"
                  id="outro-equip"
                  value={equipamento}
                  onChange={(e) => setEquipamento(e.target.value)}
                  className={`rounded border border-gray-300 px-2 py-1 text-sm shadow outline-none placeholder:text-xs placeholder:italic`}
                />
              )}
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <label className={labelStyle} htmlFor="marca">
              Marca
            </label>
            <div className="flex w-[50%] flex-row items-center justify-center gap-3">
              <input
                type="text"
                value={marca}
                id="marca"
                onChange={(e) => setMarca(e.target.value)}
                className="rounded border border-gray-300 p-2 text-left text-sm shadow outline-none placeholder:text-xs placeholder:italic"
                placeholder="Taiff"
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <label className={labelStyle} htmlFor="voltagem">
              Voltagem
            </label>
            <div className="flex w-[50%] flex-row items-center justify-center gap-3">
              <input
                type="text"
                id="voltagem"
                placeholder="110v"
                value={voltagem}
                onChange={(e) => setVoltagem(e.target.value)}
                className="w-[35%] rounded border border-gray-300 py-2 text-center text-sm shadow outline-none"
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <label className={labelStyle} htmlFor="date">
              Data de aquisição
            </label>
            <div className="flex w-[50%] flex-row items-center justify-center gap-3">
              <input
                type="date"
                id="date"
                value={dataAquisicao}
                onChange={(e) => {
                  console.log(new Date(e.target.value));
                  setDataAquisicao(e.target.value);
                }}
                className="w-full rounded border border-gray-300 py-2 text-center text-sm shadow outline-none"
              />
            </div>
          </div>

          <Button type="submit" className="my-4 w-[50%] self-center">
            Cadastrar
          </Button>
        </>
      )}
    </form>
  );
}

export default Form;
