import axios from "axios";

export async function createContabilidade(data) {
  const res = await axios.post("/api/v1/contabilidade", {
    tipo: data.isReceita ? "receita" : "despesa",
    valor: Number(data.valor),
    descricao: data.descricao,
    categoria: data.categoria,
    formaPagamento: data.formaPagamento,
  });

  return res.data.data.contabilidade;
}

export async function getContabilidade() {
  const res = await axios.get("/api/v1/contabilidade");

  return res.data.data.contabilidade;
}

export async function deleteContabilidade(id) {
  await axios.delete(`/api/v1/contabilidade/${id}`);

  return null;
}

export async function updateContabilidade({ id, data }) {
  const res = await axios.patch(`/api/v1/contabilidade/${id}`, {
    tipo: data.isReceita ? "receita" : "despesa",
    valor: Number(data.valor),
    descricao: data.descricao,
    categoria: data.categoria,
    formaPagamento: data.formaPagamento,
  });

  return res.data.data.contabilidade;
}
