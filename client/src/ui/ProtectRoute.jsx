import { useUser } from "@/features/login/useUser";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectRoute({ children }) {
  const { user, isValidating } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isValidating) navigate("/");
  }, [isValidating, user, navigate]);

  if (isValidating)
    return (
      <div className="absolute flex h-screen w-screen flex-col items-center justify-center">
        <Loader size="" />
      </div>
    );

  return children;
}

export default ProtectRoute;
