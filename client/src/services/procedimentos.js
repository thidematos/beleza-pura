import axios from "axios";

export async function createProcedimento(data) {
  const res = await axios.post("/api/v1/procedimentos", {
    procedimento: data.procedimento,
    preco: Number(data.preco),
    duracao: Number(data.hora) * 60 + Number(data.min),
    produtos: data.produtos.map((produto) => produto._id),
  });

  return res.data.data.procedimento;
}

export async function deleteProcedimento(procedimentoID) {
  await axios.delete(`/api/v1/procedimentos/${procedimentoID}`);

  return;
}

export async function updateProcedimento({ procedimentoID, data }) {
  const res = await axios.patch(`/api/v1/procedimentos/${procedimentoID}`, {
    procedimento: data.procedimento,
    preco: Number(data.preco),
    duracao: Number(data.hora) * 60 + Number(data.min),
    produtos: data.produtos.map((produto) => produto._id),
  });

  return res.data.data.procedimento;
}

export async function getAllProcedimentos() {
  const res = await axios.get("/api/v1/procedimentos");

  return res.data.data.procedimento;
}
