import Form from "./Form";
import Title from "./../../ui/Title";

function CreteModal() {
  return (
    <div className="flex flex-col items-center justify-start gap-8 px-10 py-6">
      <Title>Novo usuário</Title>
      <Form />
    </div>
  );
}

export default CreteModal;
