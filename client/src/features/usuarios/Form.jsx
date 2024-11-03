import { useState } from "react";
import Button from "./../../ui/Button";
import { useForm } from "react-hook-form";
import { validateCPF } from "./../../utils/validateCPF";
import { firstLetterUppercase } from "@/utils/firstLetterUppercase";
import { useCreateUser } from "./useCreateUser";
import Loader from "./../../ui/Loader";

const especialidades = [
  "cabelereiro geral",
  "barbeiro",
  "especialista corte",
  "colorista",
  "especialista de escova",
  "especialista de alisamento",
  "especialista em penteados",
  "extensionista",
  "designer de sombrancelha",
];

function Form() {
  //nome, cpf, role, email, celular, password, passwordConfirm, especialidades

  const { register, handleSubmit, getValues, setValue, formState } = useForm({
    defaultValues: {
      role: "secretario",
    },
  });

  const { isCreating, createUserFn } = useCreateUser();

  const { errors } = formState;

  const [isCabelereiro, setIsCabelereiro] = useState(false);

  function onError(err) {
    Object.keys(err).forEach((key) => setValue(key, ""));
  }

  return (
    <form
      className="relative grid w-full grid-cols-2 gap-8"
      onSubmit={handleSubmit(createUserFn, onError)}
    >
      {isCreating ? (
        <Loader size="col-span-2" />
      ) : (
        <>
          <ColContainer>
            <InputContainer error={errors?.nome}>
              <Label>Nome</Label>
              <input
                type="text"
                {...register("nome", {
                  onChange: () => console.log(getValues("nome")),
                  required: "É preciso um nome!",
                })}
                className={`${errors?.nome ? "border-red-500" : "border-gray-300"} rounded border p-2 text-xs shadow outline-none`}
              />
            </InputContainer>
            <InputContainer error={errors?.cpf}>
              <Label> CPF </Label>
              <input
                type="text"
                {...register("cpf", {
                  validate: (value) =>
                    validateCPF(Number(value)) || "CPF inválido!",
                })}
                className={`${errors?.cpf ? "border-red-500" : "border-gray-300"} rounded border p-2 text-xs shadow outline-none`}
              />
            </InputContainer>
            <InputContainer error={errors?.email}>
              <Label>Email</Label>
              <input
                type="text"
                {...register("email", {
                  required: "Indique seu email!",
                })}
                className={`${errors?.email ? "border-red-500" : "border-gray-300"} rounded border p-2 text-xs shadow outline-none`}
              />
            </InputContainer>
            <InputContainer>
              <Label>Categoria</Label>
              <select
                {...register("role", {
                  onChange: () => {
                    if (!getValues("role") === "cabelereiro")
                      return setValue("especialidade", "");

                    setIsCabelereiro(getValues("role") === "cabelereiro");
                  },
                })}
                className={`${errors?.role ? "border-red-500" : "border-gray-300"} rounded border p-2 text-xs shadow outline-none`}
              >
                <option value={"cabelereiro"}>Cabelereiro(a)</option>
                <option value={"secretario"}>Secretário(a)</option>
                <option value={"cliente"}>Cliente</option>
              </select>
            </InputContainer>
          </ColContainer>

          <ColContainer>
            <InputContainer error={errors?.celular}>
              <Label>Celular</Label>
              <input
                type="text"
                {...register("celular", {
                  required: "Celular inválido!",
                })}
                className={`${errors?.celular ? "border-red-500" : "border-gray-300"} rounded border p-2 text-xs shadow outline-none`}
              />
            </InputContainer>
            <InputContainer error={errors?.password}>
              <Label>Senha</Label>
              <input
                type="password"
                className={`${errors?.password ? "border-red-500" : "border-gray-300"} rounded border p-2 text-xs shadow outline-none`}
                {...register("password", {
                  required: "É necessário uma senha!",
                  validate: (value, values) =>
                    value === values.passwordConfirm ||
                    `As senhas não coincidem!`,
                })}
              />
            </InputContainer>
            <InputContainer>
              <Label>Confirmação de senha</Label>
              <input
                type="password"
                className={`${errors?.passwordConfirm ? "border-red-500" : "border-gray-300"} rounded border p-2 text-xs shadow outline-none`}
                {...register("passwordConfirm", {
                  validate: (value, values) =>
                    value === values.password || `As senhas devem coincidir!`,
                })}
              />
            </InputContainer>
            {isCabelereiro && (
              <InputContainer error={errors?.especialidade}>
                <Label>Especialidade</Label>
                <select
                  className={`${errors?.especialidade ? "border-red-500" : "border-gray-300"} rounded border p-2 text-xs shadow outline-none`}
                  {...register("especialidade", {
                    onChange: () =>
                      setIsCabelereiro(getValues("role") === "cabelereiro"),
                  })}
                >
                  {especialidades.map((especialidade) => (
                    <option key={especialidade} value={especialidade}>
                      {firstLetterUppercase(especialidade)}
                    </option>
                  ))}
                </select>
              </InputContainer>
            )}
          </ColContainer>

          <Button
            type="submit"
            className="col-span-2 w-[60%] place-self-center"
          >
            Criar usuário
          </Button>
        </>
      )}
    </form>
  );
}

function Label({ children, htmlFor }) {
  return (
    <label className="text-xs drop-shadow-sm" htmlFor={htmlFor}>
      {children}
    </label>
  );
}

function ColContainer({ children }) {
  return (
    <div className="col-span-1 flex flex-col items-center justify-center gap-6">
      {children}
    </div>
  );
}

function InputContainer({ children, error }) {
  return (
    <div className="row-span-1 flex w-full flex-col justify-between gap-1">
      {children}
      {error?.message && (
        <p className="text-[10px] text-red-600">{error.message}</p>
      )}
    </div>
  );
}

export default Form;
