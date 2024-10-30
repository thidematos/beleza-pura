function TableRow({ children }) {
  return (
    <tr className="grid grid-cols-5 border-b border-gray-300 py-4">
      {children}
    </tr>
  );
}

export default TableRow;
