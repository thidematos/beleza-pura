import axios from "axios";

const route = "/api/v1/users";

export async function createUsuario(data) {
  const res = await axios.post(route, {
    nome: data.nome,
    cpf: data.cpf,
    role: data.role,
    email: data.email,
    celular: data.celular,
    password: data.password,
    passwordConfirm: data.passwordConfirm,
    especialidades: data.especialidades,
  });

  return res.data.data.user;
}

export async function getAllUsuarios() {
  const res = await axios.get(route);

  return res.data.data.user;
}

export async function deleteUsuario(id) {
  await axios.delete(`${route}/${id}`);

  return null;
}

export async function updateUsuario({ id, data }) {
  const res = await axios.patch(`${route}/${id}`, {
    nome: data.nome,
    cpf: data.cpf,
    role: data.role,
    email: data.email,
    celular: data.celular,
    especialidades: data.role === "cabelereiro" ? data.especialidades : [],
  });

  return res.data.data.user;
}
