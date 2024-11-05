import axios from "axios";

export async function getAllEquipamentos() {
  const res = await axios.get("/api/v1/equipamentos");

  return res.data.data.equipamento;
}

export async function createEquipamento(data) {
  const res = await axios.post(`/api/v1/equipamentos`, {
    equipamento: data.equipamento,
    voltagem: data.voltagem,
    dataAquisicao: new Date(data.dataAquisicao),
    marca: data.marca,
  });

  return res.data.data.equipamento;
}

export async function deleteEquipamento(id) {
  await axios.delete(`/api/v1/equipamentos/${id}`);

  return null;
}

export async function updateEquipamento({ id, data }) {
  const res = await axios.patch(`/api/v1/equipamentos/${id}`, {
    equipamento: data.equipamento,
    voltagem: data.voltagem,
    dataAquisicao: new Date(data.dataAquisicao),
    marca: data.marca,
  });

  return res.data.data.equipamento;
}
