import axios from "axios";

export async function getAllEquipamentos() {
  const res = await axios.get("/api/v1/equipamentos");

  return res.data.data.equipamento;
}
