import { useUser } from "@/features/login/useUser";
import Logo from "./Logo";
import NavButton from "./NavButton";

function Header() {
  const { isValidating, user } = useUser();

  return (
    <nav className="grid w-full grid-cols-10 bg-neutral-950 px-2 py-4">
      <Logo width={"col-span-3"} />
      <div className="col-span-7 flex flex-row flex-wrap items-center justify-center gap-x-10">
        {!isValidating && user.role !== "cliente" && (
          <>
            <NavButton to="/overview/usuarios">Usuários</NavButton>
            <NavButton to="/overview/procedimentos">Procedimentos</NavButton>
            <NavButton to="/overview/contabilidade">Contabilidade</NavButton>
            <NavButton to="/overview/produtos">Produtos</NavButton>
            <NavButton to="/overview/equipamentos">Equipamentos</NavButton>
          </>
        )}

        <NavButton to="/overview/agendamentos">Agendamentos</NavButton>
      </div>
    </nav>
  );
}

export default Header;
