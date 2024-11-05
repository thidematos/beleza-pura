import { useUser } from "@/features/login/useUser";
import Loader from "./Loader";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { useEffect } from "react";

function ProtectRoute({ children }) {
  const { user, isValidating, error } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (error && !isValidating) navigate("/");
  }, [isValidating, error, navigate]);

  if (isValidating)
    return (
      <div className="absolute flex h-screen w-screen flex-col items-center justify-center">
        <Loader size="" />
      </div>
    );

  if (!error && !isValidating) return children;
}

export default ProtectRoute;
