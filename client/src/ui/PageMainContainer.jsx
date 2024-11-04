function PageMainContainer({ children, id }) {
  return (
    <div id={id} className="grid grid-cols-10">
      {children}
    </div>
  );
}

export default PageMainContainer;
