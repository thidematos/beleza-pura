import { useState } from "react";
import Button from "./../../ui/Button";
import { useForm } from "react-hook-form";
import { validateCPF } from "./../../utils/validateCPF";
import { firstLetterUppercase } from "@/utils/firstLetterUppercase";
import { useCreateUser } from "./useCreateUser";
import Loader from "./../../ui/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import Tag from "@/ui/Tag";
import { useUpdateUser } from "./useUpdateUser";
import Label from "./../../ui/Label";

function Form({ isUpdate = false }) {
  //nome, cpf, role, email, celular, password, passwordConfirm, especialidades

  const { register, handleSubmit, getValues, setValue, formState } = useForm({
    defaultValues: {
      nome: isUpdate.nome,
      cpf: isUpdate.cpf,
      email: isUpdate.email,
      celular: isUpdate.celular,
      role: isUpdate.role || "secretario",
    },
  });

  const { isCreating, createUserFn } = useCreateUser();
  const { isUpdating, updateUserFn } = useUpdateUser(isUpdate?._id);

  const { errors } = formState;

  const [isCabelereiro, setIsCabelereiro] = useState(() => {
    if (isUpdate && isUpdate.role === "cabelereiro") return true;

    return false;
  });

  const [selectedEspecialidades, setSelectedEspecialidades] = useState(() => [
    ...(isUpdate.especialidades || []),
  ]);

  function onError(err) {
    Object.keys(err).forEach((key) => setValue(key, ""));
  }

  function addSelectedEspecialidades(data) {
    data.especialidades = selectedEspecialidades;
    isUpdate ? updateUserFn(data) : createUserFn(data);
  }

  return (
    <form
      className="relative grid max-h-[60svh] w-full grid-cols-2 gap-8 overflow-y-scroll pb-8"
      onSubmit={handleSubmit(addSelectedEspecialidades, onError)}
    >
      {isCreating || isUpdating ? (
        <Loader size="col-span-2 place-self-center" />
      ) : (
        <>
          <ColContainer>
            <InputContainer error={errors?.nome}>
              <Label>Nome</Label>
              <input
                type="text"
                {...register("nome", {
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
            {!isUpdate && (
              <>
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
                        value === values.password ||
                        `As senhas devem coincidir!`,
                    })}
                  />
                </InputContainer>
              </>
            )}

            {isCabelereiro && (
              <InputContainer error={errors?.especialidade}>
                <Label>Especialidade</Label>
                <DialogMenu
                  selected={[selectedEspecialidades, setSelectedEspecialidades]}
                />
              </InputContainer>
            )}
          </ColContainer>

          <Button
            type="submit"
            className="col-span-2 w-[60%] place-self-center"
          >
            {isUpdate ? "Atualizar" : "Criar"} usuário
          </Button>
        </>
      )}
    </form>
  );
}

function DialogMenu({ selected }) {
  const [selectedEspecialidades, setSelectedEspecialidades] = selected;

  const [especialidades, setEspecialidades] = useState(() =>
    [
      "cabelereiro geral",
      "barbeiro",
      "especialista corte",
      "colorista",
      "especialista de escova",
      "especialista de alisamento",
      "especialista em penteados",
      "extensionista",
      "designer de sombrancelha",
    ].filter((item) => !selectedEspecialidades.includes(item)),
  );

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  function handleSelectEspecialidade(especialidade) {
    setEspecialidades((state) =>
      state.filter((item) => item !== especialidade),
    );
    setSelectedEspecialidades((state) => [...state, especialidade]);
    setIsOpenDialog(false);
  }

  function handleUnselectEspecialidade(especialidade) {
    setEspecialidades((state) => [...state, especialidade]);

    setSelectedEspecialidades((state) =>
      state.filter((item) => item !== especialidade),
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`relative flex w-full flex-col items-center justify-center rounded rounded-t border border-gray-300 p-2 text-xs shadow outline-none`}
      >
        <div
          className="flex w-full cursor-pointer flex-row items-center justify-between"
          onClick={() => setIsOpenDialog((state) => !state)}
        >
          <p className="select-none text-left italic">
            Selecionar especialidades...
          </p>
          <FontAwesomeIcon icon={faArrowDown} className="text-blue-500/85" />
        </div>
        <ul
          className={`${isOpenDialog ? "visible" : "collapse"} absolute top-[100%] z-[50] flex max-h-44 w-full flex-col items-start justify-start overflow-y-scroll rounded-b border border-gray-400 bg-gray-100 shadow-xl`}
        >
          {especialidades.sort().map((especialidade) => (
            <ul
              onClick={() => handleSelectEspecialidade(especialidade)}
              className="w-full cursor-pointer select-none px-1 py-2 hover:bg-gray-200"
              key={especialidade}
              value={especialidade}
            >
              {firstLetterUppercase(especialidade)}
            </ul>
          ))}
        </ul>
      </div>
      <div className="flex w-full flex-row flex-wrap items-center justify-start gap-2">
        {selectedEspecialidades.map((selected) => (
          <Tag
            key={selected}
            label={selected}
            hasDelete={() => handleUnselectEspecialidade(selected)}
          />
        ))}
      </div>
    </div>
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
