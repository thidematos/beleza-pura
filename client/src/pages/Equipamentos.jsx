import { useGetEquipamentos } from "../features/equipamentos/useGetEquipamentos";

function Equipamentos() {
  const { isGetting, equipamentos } = useGetEquipamentos();

  console.log(equipamentos);

  return <div className="markup grid grid-cols-10"></div>;
}

export default Equipamentos;
