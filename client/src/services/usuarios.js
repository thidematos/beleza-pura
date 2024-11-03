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
    especialidade: data.especialidade,
  });

  return res.data.data.user;
}

export async function getAllUsuarios() {
  const res = await axios.get(route);

  return res.data.data.user;
}
