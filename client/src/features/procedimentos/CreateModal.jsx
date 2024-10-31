import Form from "./Form";

function CreateModal() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 px-10 py-6">
      <h2 className="text-lg uppercase drop-shadow-sm">Novo procedimento</h2>
      <Form />
    </div>
  );
}

export default CreateModal;
