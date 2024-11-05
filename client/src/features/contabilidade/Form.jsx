import Button from "@/ui/Button";
import Label from "@/ui/Label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateContabilidade } from "./useCreateContabilidade";
import Loader from "@/ui/Loader";
import { useContabilidade } from "@/context/ContabilidadeProvider";
import { firstLetterUppercase } from "@/utils/firstLetterUppercase";
import { useUpdateContabilidade } from "./useUpdateContabilidade";

function Form({ isUpdate = false }) {
  const [isReceita, setIsReceita] = useState(() =>
    isUpdate ? (isUpdate.tipo === "despesa" ? false : true) : false,
  );
  const { register, handleSubmit } = useForm({
    defaultValues: isUpdate
      ? {
          valor: isUpdate.valor,
          descricao: isUpdate.descricao,
          categoria: isUpdate.categoria,
          formaPagamento: isUpdate.formaPagamento,
        }
      : {},
  });

  const { isCreating, createContabilidadeApi } = useCreateContabilidade();

  const { isUpdating, updateContabilidadeApi } = useUpdateContabilidade(
    isUpdate._id,
  );

  const { categorias, formasPagamento } = useContabilidade();

  return (
    <form
      className="space-y-6 py-6"
      onSubmit={handleSubmit(
        isUpdate ? updateContabilidadeApi : createContabilidadeApi,
      )}
    >
      {isCreating || isUpdating ? (
        <Loader />
      ) : (
        <>
          <div className="flex w-full flex-row items-center justify-center gap-2">
            <div className="flex flex-col items-start justify-center">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isReceita}
                  {...register("isReceita", {
                    onChange: () => setIsReceita((state) => !state),
                  })}
                />
                <span className="slider round" />
              </label>
            </div>
            <p className="uppercase underline decoration-gray-500 outline-offset-2 drop-shadow-sm">
              {isReceita ? "Receita" : "Despesa"}
            </p>
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-1">
            <Label>Descrição</Label>
            <input
              type="text"
              {...register("descricao")}
              className="rounded border border-gray-300 px-2 py-1 text-sm shadow outline-none"
            />
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-1">
            <Label>Valor</Label>
            <input
              type="number"
              {...register("valor")}
              step={0.01}
              className="rounded border border-gray-300 px-2 py-1 text-sm shadow outline-none"
            />
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-1">
            <Label>Categoria</Label>
            <select className="w-full" {...register("categoria")}>
              {categorias[isReceita ? "receita" : "despesa"].map((item) => (
                <option key={item} value={item.toLowerCase()}>
                  {firstLetterUppercase(item)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-1">
            <Label>Forma de pagamento</Label>
            <select className="w-full" {...register("formaPagamento")}>
              {formasPagamento.map((item) => (
                <option key={item} value={item.toLowerCase()}>
                  {firstLetterUppercase(item)}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" className="w-full" padding="py-2">
            {isUpdate ? "Atualizar" : "Registrar"}
          </Button>
        </>
      )}
    </form>
  );
}

export default Form;
