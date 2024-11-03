import Logo from "./Logo";
import NavButton from "./NavButton";

function Header() {
  return (
    <nav className="grid w-full grid-cols-10 bg-neutral-950 px-2 py-4">
      <Logo width={"col-span-3"} />
      <div className="col-span-7 flex flex-row flex-wrap items-center justify-center gap-x-10">
        <NavButton to="/usuarios">Usuários</NavButton>
        <NavButton to="/procedimentos">Procedimentos</NavButton>
        <NavButton to="/agendamentos">Agendamentos</NavButton>
        <NavButton to="/contabilidade">Contabilidade</NavButton>
        <NavButton to="/produtos">Produtos</NavButton>
        <NavButton to="/equipamentos">Equipamentos</NavButton>
      </div>
    </nav>
  );
}

export default Header;
