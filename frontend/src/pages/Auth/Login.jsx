import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

// images
import logo from "../../assets/images/logo.png";
import dashboard from "../../assets/images/dashboard-messaging.png";

// icons
import { CgProfile } from "react-icons/cg";

// components
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, isDemoPending, error, demoError } = useLogin();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  const handleDemoAccountLogin = async () => {
    await login(
      import.meta.env.VITE_DEMO_EMAIL,
      import.meta.env.VITE_DEMO_PASSWORD,
      true,
    );
  };

  return (
    <main className="flex h-screen w-full">
      <section className="mx-auto flex flex-col justify-center px-4 xl:w-[40%] xl:px-20 2xl:px-[112px] ">
        <div className="space-y-6 rounded-lg border-[1px] px-6 py-7 sm:p-12 xl:border-[0px] xl:p-0">
          <header className="mb-14 flex items-center gap-3">
            <img src={logo} alt="logo" className="h-16 w-16" />

            <h1 className="text-xl font-extrabold sm:text-3xl">
              {" "}
              Odin Messaging App
            </h1>
          </header>

          <div className="flex flex-col gap-3 ">
            <h2 className="text-3xl font-bold text-[#101828] sm:text-5xl">
              {" "}
              Welcome back
            </h2>
            <p className="text-justify text-[#475467] sm:text-lg">
              New to Odin Messaging App?{" "}
              <Link
                to="/signup"
                className="cursor-pointer font-bold text-primaryOrange"
              >
                Create an account.{" "}
              </Link>
            </p>
          </div>

          <form
            className="flex flex-col space-y-5 text-[#475467]"
            onSubmit={handleLoginSubmit}
          >
            <label className="form_label">
              <span className="text-sm font-bold">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="auth_input"
              />
            </label>

            <label className="form_label">
              <span className="text-sm font-bold">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth_input"
              />
            </label>

            <button className="flex w-full items-center justify-center rounded-md bg-primaryOrange py-2.5 font-semibold text-white">
              {isPending ? (
                <Loading loadingColor="#ffffff" loadingSize={30} />
              ) : (
                "Log in"
              )}
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-md border-[1px] border-primaryOrange bg-white  py-2.5 font-semibold"
              onClick={handleDemoAccountLogin}
            >
              {" "}
              <CgProfile className="text-2xl text-primaryOrange" />
              <span>
                {isDemoPending ? "Logging in ..." : "Try a demo account"}
              </span>
            </button>

            {error && (
              <Error
                error={error}
                errorColor={"text-primaryOrange"}
                errorSize={"text-lg"}
              />
            )}

            {demoError && (
              <Error
                error={demoError}
                errorColor={"text-primaryOrange"}
                errorSize={"text-base sm:text-lg"}
              />
            )}
          </form>
        </div>
      </section>

      {/* Image */}
      <section className="hidden w-[60%] xl:block">
        <img src={dashboard} alt="login image" className="h-full w-full " />
      </section>
    </main>
  );
};

export default Login;
