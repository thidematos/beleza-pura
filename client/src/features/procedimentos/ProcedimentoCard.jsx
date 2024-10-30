function ProcedimentoCard({ procedimento }) {
  return (
    <div className="flex h-[360px] w-[220px] flex-col items-center justify-center gap-3 rounded-lg bg-brandGreen p-4 text-sm text-slate-200 shadow-lg">
      <p className="text-center font-poppins text-lg uppercase drop-shadow-sm">
        {procedimento.procedimento}
      </p>
      <img className="rounded drop-shadow-sm" src={procedimento.image} />

      <ul className="flex max-h-[20%] w-full list-inside list-disc flex-col items-start justify-start gap-y-1 overflow-y-scroll px-2">
        {procedimento.usedProdutos.map((produto) => (
          <li className="text-xs" key={produto}>
            {produto}
          </li>
        ))}
      </ul>

      <div className="flex w-full flex-col items-center justify-center gap-2">
        <p className="flex w-full flex-row justify-between">
          <span className="">Finalização:</span>{" "}
          <span>{procedimento.duration}</span>
        </p>
        <p className="flex w-full flex-row justify-between">
          <span className="">Preço:</span>
          <span> {procedimento.pricing}</span>
        </p>
      </div>
    </div>
  );
}

export default ProcedimentoCard;
