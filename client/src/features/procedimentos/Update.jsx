import Form from "./Form";

function Update({ procedimento }) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 px-10 py-6">
      <h2 className="text-lg uppercase drop-shadow-sm">
        Atualizar {procedimento.procedimento}
      </h2>
      <Form
        isUpdate={{
          id: procedimento._id,
          procedimento: procedimento.procedimento,
          preco: procedimento.preco,
          produtos: procedimento.produtos,
          hora: Math.floor(procedimento.duracao / 60),
          min: procedimento.duracao % 60,
        }}
      />
    </div>
  );
}

export default Update;
