import { NavLink } from "react-router-dom";

function NavButton({ to = "", children }) {
  return (
    <NavLink
      to={to}
      className="font-montserrat text-sm uppercase text-gray-50 drop-shadow-lg duration-100 hover:text-green-600"
    >
      {children}
    </NavLink>
  );
}

export default NavButton;
