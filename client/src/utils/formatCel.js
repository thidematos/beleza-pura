export function formatCel(cel) {
  const str = cel;

  return `(${str.slice(0, 2)})${str.slice(2, 7)}-${str.slice(7)}`;
}
