import CreateProcedimento from "../features/procedimentos/CreateProcedimento";

function Procedimentos() {
  return (
    <div className="grid grid-cols-10">
      <div className="col-span-2">dummy</div>
      <div className="col-span-6 flex flex-col items-center justify-center text-xl">
        big dummy
      </div>
      <CreateProcedimento />
    </div>
  );
}

export default Procedimentos;
