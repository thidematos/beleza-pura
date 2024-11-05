import Title from "@/ui/Title";
import Form from "./Form";

function ModalContainer({ isUpdate = false }) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 px-10 py-6">
      <Title>{isUpdate ? "Atualizar " : "Criar"} agendamento</Title>
      <Form isUpdate={isUpdate} />
    </div>
  );
}

export default ModalContainer;
