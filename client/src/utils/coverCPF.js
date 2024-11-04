export function coverCPF(cpf) {
  return `xxx.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-xx`;
}
