function Label({ children, htmlFor, className = "" }) {
  return (
    <label className={`text-xs drop-shadow-sm ${className}`} htmlFor={htmlFor}>
      {children}
    </label>
  );
}
export default Label;
