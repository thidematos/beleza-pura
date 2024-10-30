import Form from "./Form";

function CreateModal() {
  return (
    <div className="flex flex-col items-center justify-center px-10 py-6">
      <h2 className="">Novo procedimento</h2>
      <Form />
    </div>
  );
}

export default CreateModal;
