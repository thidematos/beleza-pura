import {
  EquipamentoProvider,
  useEquipamento,
} from "../../context/EquipamentoProvider";
import Title from "../../ui/Title";
import Form from "./Form";

function CreateModal() {
  return (
    <EquipamentoProvider>
      <div className="flex w-full flex-col items-center justify-center gap-8 px-10 py-6">
        <Title>Novo equipamento</Title>
        <Form />
      </div>
    </EquipamentoProvider>
  );
}

export default CreateModal;
