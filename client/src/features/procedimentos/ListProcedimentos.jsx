import ProcedimentoCard from "./ProcedimentoCard";

function ListProcedimentos() {
  const procedimentos = [
    {
      procedimento: "Corte de cabelo",
      duration: "30-60 min.",
      image: "corte-cabelo.jpg",
      usedProdutos: ["Shampoo", "Condicionador", "Produtos para finalização"],
      pricing: "R$ 50-150",
    },
    {
      procedimento: "Coloração",
      duration: "1-2 hrs",
      image: "coloracao.jpg",
      usedProdutos: [
        "Tinta para cabelo",
        "Oxidante",
        "Shampoo pós-coloração",
        "Máscara capilar",
      ],
      pricing: "R$ 100-300",
    },
    {
      procedimento: "Mechas",
      duration: "2-3 hrs",
      image: "mechas.jpg",
      usedProdutos: [
        "Descolorante",
        "Oxidante",
        "Tinta para cabelo",
        "Shampoo pós-coloração",
        "Máscara capilar",
      ],
      pricing: "R$ 150-400",
    },
    {
      procedimento: "Alisamento",
      duration: "3-4 hrs",
      image: "alisamento.jpg",
      usedProdutos: [
        "Produtos para alisamento",
        "Shampoo pós-alisamento",
        "Máscara capilar",
      ],
      pricing: "R$ 300-800",
    },
    {
      procedimento: "Hidratação",
      image: "hidratacao.jpg",
      duration: "1 hr",
      usedProdutos: ["Shampoo", "Máscara hidratante", "Finalizador"],
      pricing: "R$ 50-100",
    },

    {
      procedimento: "Maquiagem",
      image: "maquiagem.jpg",
      duration: "1-2 hrs",
      usedProdutos: ["Base, corretivo, pó, blush, sombra, rímel, batom, etc."],
      pricing: "R$ 80-200",
    },
  ];

  return (
    <div className="col-span-6 flex w-full flex-row flex-wrap items-center justify-center gap-8 py-8">
      {procedimentos
        .map((item, ind) => {
          return { ...item, id: ind };
        })
        .map((procedimento) => (
          <ProcedimentoCard key={procedimento.id} procedimento={procedimento} />
        ))}
    </div>
  );
}

export default ListProcedimentos;
