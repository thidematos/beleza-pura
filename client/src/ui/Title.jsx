function Title({ children, fontSize = "text-lg" }) {
  return <h2 className={`${fontSize} uppercase drop-shadow-sm`}>{children}</h2>;
}

export default Title;
