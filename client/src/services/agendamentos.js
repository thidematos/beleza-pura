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

export async function confirmSchedule({ id, status }) {
  const res = await axios.patch(`/api/v1/agendamentos/confirm/${id}`, {
    status,
  });

  console.log(res);

  return res.data.data.agendamento;
}
export async function deleteSchedule(id) {
  await axios.delete(`/api/v1/agendamentos/${id}`);

  return null;
}

export async function updateAgendamento({ id, data }) {
  const res = await axios.patch(`/api/v1/agendamentos/${id}`, {
    nome: data.nome,
    quando: new Date(data.quando),
    procedimentos: data.procedimentos,
    cabelereiro: data.cabelereiro === "qualquer" ? null : data.cabelereiro,
  });

  return res.data.data.agendamento;
}
