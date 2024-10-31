import { useForm } from "react-hook-form";
import FormInput from "./../../ui/FormInput";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import { useGetProdutos } from "./../produtos/useGetProdutos";
import Loader from "./../../ui/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useCreateProcedimento } from "./useCreateProcedimento";
import { useUpdateProcedimento } from "./useUpdateProcedimento";

function Form({ isUpdate = false }) {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: isUpdate,
  });

  const { isPending: isCreating, newProcedimento } = useCreateProcedimento();

  const { isPending: isUpdating, updateProcedimentoFn } = useUpdateProcedimento(
    isUpdate?.id,
  );

  const [isPending, produtos] = useGetProdutos();

  const [selectedProdutos, setSelectedProdutos] = useState(() =>
    isUpdate ? isUpdate.produtos : [],
  );

  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const isAllSelected = selectedProdutos?.length === produtos?.length;

  useEffect(() => {
    setValue("produtos", selectedProdutos);
  }, [selectedProdutos, setValue]);

  return (
    <form
      className="grid grid-cols-2 gap-6"
      onSubmit={handleSubmit(isUpdate ? updateProcedimentoFn : newProcedimento)}
    >
      {isCreating || isUpdating ? (
        <Loader size="size-[100px] col-span-2 place-self-center" />
      ) : (
        <>
          <Labels />

          <div className="col-span-1 grid grid-rows-4 place-items-center gap-4">
            <input
              type="text"
              id="procedimento"
              className="row-span-1 w-fit rounded border border-gray-300 p-2 text-sm shadow outline-none"
              {...register("procedimento")}
            />
            <input
              type="number"
              id="preco"
              step="0.01"
              className="row-span-1 w-fit rounded border border-gray-300 p-2 text-sm shadow outline-none"
              {...register("preco")}
            />
            <div className="row-span-1 flex w-fit flex-row items-center justify-center gap-3">
              <input
                type="number"
                id="hora"
                {...register("hora", { min: 0, max: 23 })}
                className="col-span-2 w-[20%] rounded border border-gray-300 p-1 text-center text-sm outline-none"
              />
              <span className="col-span-1 text-center text-sm">hrs.</span>
              <input
                type="number"
                id="min"
                {...register("min", {
                  min: 0,
                  max: 59,
                })}
                className={`col-span-2 w-[20%] rounded border border-gray-300 p-1 text-center text-sm outline-none`}
              />
              <span className="col-span-1 text-center text-sm">min.</span>
            </div>
            <div className="row-span-1 flex flex-row items-center justify-center">
              {isPending ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="animate-spin text-2xl text-green-700"
                />
              ) : (
                <div className="relative flex cursor-pointer select-none">
                  <div
                    className="flex flex-row items-center justify-center gap-3 rounded-t-lg border border-gray-300 px-4 py-2"
                    onClick={() => {
                      if (isAllSelected) return;

                      setIsOpenDropdown((state) => !state);
                    }}
                  >
                    <p className="text-sm">
                      {isAllSelected
                        ? "Não há mais produtos"
                        : "Selecionar produtos"}
                    </p>
                    {isAllSelected || (
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        className="text-green-900"
                      />
                    )}
                  </div>
                  <div
                    className={` ${isOpenDropdown ? "visible" : "collapse"} absolute top-[100%] z-[50] flex max-h-40 w-full flex-col items-start justify-center overflow-y-scroll rounded-b-lg border border-gray-300 bg-gray-50 shadow-xl`}
                  >
                    {produtos.map((produto, ind, arr) => {
                      if (
                        selectedProdutos.some(
                          (selected) => selected._id === produto._id,
                        )
                      )
                        return;

                      return (
                        <p
                          key={produto._id}
                          className={`${ind === arr.length - 1 ? "rounded-b-lg" : "border-b border-gray-200"} w-full p-2 text-xs hover:bg-green-700 hover:text-gray-100`}
                          onClick={() => {
                            setIsOpenDropdown(false);
                            setSelectedProdutos((state) => [...state, produto]);
                          }}
                        >
                          {produto.produto}
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-2 flex flex-row flex-wrap items-center justify-start gap-x-6 gap-y-3">
            {selectedProdutos.map((selected) => (
              <p
                key={selected._id}
                className="flex select-none flex-row items-center justify-center gap-2 rounded-full border border-gray-300 bg-green-700 px-3 py-2 text-xs text-gray-50 shadow"
              >
                <span className="drop-shadow-sm">{selected.produto}</span>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="cursor-pointer text-sm text-gray-200 drop-shadow"
                  onClick={() =>
                    setSelectedProdutos((state) =>
                      state.filter(
                        (selectedProduto) =>
                          selectedProduto._id !== selected._id,
                      ),
                    )
                  }
                />
              </p>
            ))}
          </div>
          <input
            type="hidden"
            {...register("produtos", {
              validate: (value) => value.length !== 0,
            })}
          />

          <Button
            className="col-span-2 mt-4 w-[65%] place-self-center"
            type="submit"
          >
            Cadastrar
          </Button>
        </>
      )}
    </form>
  );
}

function Labels() {
  return (
    <div className="col-span-1 grid grid-rows-4 items-center gap-4">
      <label
        className="row-span-1 text-lg uppercase drop-shadow-sm"
        htmlFor="procedimento"
      >
        Procedimento
      </label>
      <label
        className="row-span-1 text-lg uppercase drop-shadow-sm"
        htmlFor="preco"
      >
        Preço
      </label>
      <label
        className="row-span-1 text-lg uppercase drop-shadow-sm"
        htmlFor="min"
      >
        Duração
      </label>
      <p className="row-span-1 text-lg uppercase drop-shadow-sm">Produtos</p>
    </div>
  );
}

export default Form;
