import { useState } from "react";
import { useEquipamento } from "../../context/EquipamentoProvider";
import Button from "./../../ui/Button";
import useCreateEquipamento from "./useCreateEquipamento";
import toast from "react-hot-toast";
import Loader from "../../ui/Loader";
import { useUpdateEquipamento } from "./useUpdateEquipamento";
import { firstLetterUppercase } from "../../utils/firstLetterUppercase";

const labelStyle = `w-[50%] uppercase`;

function Form({ isUpdate = false }) {
  const { equipEnum } = useEquipamento();

  const { isCreating, createEquipamentoFn } = useCreateEquipamento();
  const { isUpdating, updateEquipamentoFn } = useUpdateEquipamento(isUpdate.id);

  const [equipamento, setEquipamento] = useState(() =>
    isUpdate ? isUpdate.equipamento : "",
  );
  const [quantidade, setQuantidade] = useState(() =>
    isUpdate ? isUpdate.quantidade : 0,
  );
  const [preco, setPreco] = useState(() => (isUpdate ? isUpdate.preco : 0.0));
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
            quantidade,
            preco,
            marca,
          });
        } else {
          return createEquipamentoFn({
            equipamento,
            quantidade,
            preco,
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
            <label className={labelStyle} htmlFor="quantidade">
              Quantidade
            </label>
            <div className="flex w-[50%] flex-row items-center justify-center gap-3">
              <span className="text-gray-500">Un.</span>
              <input
                type="number"
                id="quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                className="w-[35%] rounded border border-gray-300 py-2 text-center text-sm shadow outline-none"
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <label className={labelStyle} htmlFor="preco">
              Preço
            </label>
            <div className="flex w-[50%] flex-row items-center justify-center gap-3">
              <span className="text-gray-500">R$ </span>
              <input
                type="number"
                id="preco"
                value={preco}
                step={0.01}
                onChange={(e) => setPreco(e.target.value)}
                className="w-[35%] rounded border border-gray-300 py-2 text-center text-sm shadow outline-none"
              />
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
          <Button type="submit" className="my-4 w-[50%] self-center">
            Cadastrar
          </Button>
        </>
      )}
    </form>
  );
}

export default Form;
