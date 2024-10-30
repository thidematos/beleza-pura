import axios from "axios";

export async function getAllProdutos() {
  const res = await axios.get("/api/v1/produtos");

  return res.data.data.produto;
}

export async function deleteProduto(id) {
  await axios.delete(`/api/v1/produtos/${id}`);

  return null;
}

export async function updateProduto({ id, data }) {
  const res = await axios.patch(`/api/v1/produtos/${id}`, {
    produto: data.produto,
    quantidade: data.qtd,
    preco: Number(data.preco),
    validade: new Date(data.validade),
  });

  return res.data.data.produto;
}

export async function createProduto(data) {
  const res = await axios.post("/api/v1/produtos", {
    produto: data.produto,
    quantidade: data.qtd,
    preco: Number(data.preco),
    validade: new Date(data.validade),
  });

  return res.data.data.produto;
}
