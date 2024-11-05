import Title from "@/ui/Title";

function ModalContainer({ children, isUpdate = false }) {
  return (
    <div className="flex w-full flex-col items-center justify-center px-16 py-6">
      <Title>{isUpdate ? "Atualizar" : "Criar"} registro contábil</Title>
      {children}
    </div>
  );
}

export default ModalContainer;
