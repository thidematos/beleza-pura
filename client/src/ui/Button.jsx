function Button({
  className = "",
  colors = "border-gray-300 bg-brandGreen text-gray-50 hover:bg-green-900",
  padding = "p-4",
  children,
  onClick = () => null,
  type = "button",
}) {
  return (
    <button
      className={`${className} ${colors} rounded border-2 ${padding} uppercase shadow-lg drop-shadow duration-100`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
