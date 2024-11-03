import Form from "./Form";

function Update({ equipamento }) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 px-10 py-6">
      <h2 className="text-lg uppercase drop-shadow-sm">
        Atualizar {equipamento.equipamento}
      </h2>
      <Form
        isUpdate={{
          id: equipamento._id,
          equipamento: equipamento.equipamento,
          preco: equipamento.preco,
          quantidade: equipamento.quantidade,
          marca: equipamento.marca,
        }}
      />
    </div>
  );
}

export default Update;
