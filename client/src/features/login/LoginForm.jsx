import Button from "@/ui/Button";
import Logo from "@/ui/Logo";
import { useState } from "react";
import useLogin from "./useLogin";
import Loader from "./../../ui/Loader";

function LoginForm() {
  const [email, setEmail] = useState("raizer50@gmail.com");
  const [password, setPassword] = useState("beleza123");

  const { isLogging, loginFn } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    loginFn({ email, password });
  }

  return (
    <div className="flex w-[40%] flex-col items-center justify-center gap-8 rounded-xl border border-gray-400 bg-neutral-900 px-10 py-16 shadow-2xl">
      <Logo width={"w-[120%]"} />
      <form
        onSubmit={handleSubmit}
        className="flex w-[80%] flex-col items-center justify-center gap-8 rounded-lg border border-gray-300 bg-gray-100 px-[10%] py-10 shadow-lg"
      >
        {isLogging ? (
          <div className="flex w-full flex-row items-center justify-center py-16">
            <Loader />
          </div>
        ) : (
          <>
            <div className="flex w-full flex-col items-start justify-center gap-1">
              <label className="text-sm uppercase drop-shadow-sm">Email</label>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full rounded px-2 py-1 text-sm shadow-sm outline-none"
              />
            </div>
            <div className="flex w-full flex-col items-start justify-center gap-1">
              <label className="text-sm uppercase drop-shadow-sm">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded px-2 py-1 text-sm shadow-sm outline-none"
              />
            </div>
            <Button type="submit" className="w-full" padding="py-2">
              Login
            </Button>
          </>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
