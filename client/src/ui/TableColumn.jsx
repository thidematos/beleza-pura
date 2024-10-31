function TableColumn({ isHead = false, children }) {
  const className = "col-span-1 font-normal";

  if (isHead)
    return <th className={`${className} font-semibold`}>{children}</th>;

  return <td className={className}>{children}</td>;
}

export default TableColumn;
