function TableColumn({ isHead = false, children }) {
  const className = " col-span-1 font-normal";

  if (isHead)
    return <th className={`${className} font-semibold`}>{children}</th>;

  return <th className={className}>{children}</th>;
}

export default TableColumn;
