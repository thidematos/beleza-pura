function TableRow({ children, cols = "grid-cols-5" }) {
  return (
    <tr className={`grid ${cols} border-b border-gray-300 py-4`}>{children}</tr>
  );
}

export default TableRow;
