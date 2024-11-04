import Title from "@/ui/Title";

function Update({ children }) {
  return (
    <div className="flex flex-col items-center justify-start gap-8 px-10 py-6">
      <Title>Atualizar cadastro</Title>
      {children}
    </div>
  );
}

export default Update;
