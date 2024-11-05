import { useUser } from "@/features/login/useUser";
import Logo from "./Logo";
import NavButton from "./NavButton";
import { firstLetterUppercase } from "@/utils/firstLetterUppercase";

function Header() {
  const { isValidating, user } = useUser();

  return (
    <nav className="grid w-full grid-cols-10 bg-neutral-950 px-2 py-4">
      <Logo width={"col-span-2"} />
      <div className="col-span-1 flex flex-col items-center justify-center text-xs text-gray-50">
        <p className="">{user.nome}</p>
        <p className="text-[10px]">{firstLetterUppercase(user.role)}</p>
      </div>
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
