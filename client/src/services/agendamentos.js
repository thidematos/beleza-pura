import axios from "axios";

export async function getAgendamentos() {
  const res = await axios.get("/api/v1/agendamentos");

  return res.data.data.agendamento;
}

export async function createAgendamento(data) {
  const res = await axios.post("/api/v1/agendamentos", {
    nome: data.nome,
    quando: new Date(data.quando),
    procedimentos: data.procedimentos,
    cabelereiro: data.cabelereiro === "qualquer" ? null : data.cabelereiro,
  });

  return res.data.data.agendamento;
}
