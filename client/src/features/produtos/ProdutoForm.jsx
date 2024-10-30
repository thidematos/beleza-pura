import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FormInput from "../../ui/FormInput";

function ProdutoForm({ mutate, useValues = false }) {
  const { register, handleSubmit } = useForm({
    defaultValues: useValues ? useValues : {},
  });

  return (
    <form
      className="items-between flex w-full flex-col justify-center gap-6"
      onSubmit={handleSubmit(mutate)}
    >
      <FormInput
        label={"Produto"}
        id={"produto"}
        type={"text"}
        placeholder={"Shampoo hidratante"}
        register={{
          register,
          api: {
            required: true,
          },
        }}
      />
      <FormInput
        label={"Quantidade"}
        id={"qtd"}
        type={"number"}
        register={{ register, api: { min: 0, required: true } }}
      />
      <FormInput
        label={"Preço"}
        id={"preco"}
        type={"number"}
        register={{ register, api: { min: 0, required: true } }}
      />
      <FormInput
        label={"Validade"}
        id={"validade"}
        type={"date"}
        inputClass={
          "bg-transparent outline-none p-2 border border-gray-300 rounded"
        }
        register={{ register, api: { required: true } }}
      />
      <Button className="mt-6" type="submit">
        {useValues ? "Atualizar" : "Cadastrar"}
      </Button>
    </form>
  );
}

export default ProdutoForm;
