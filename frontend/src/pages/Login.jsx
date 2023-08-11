import React, { useState } from "react";
import dashboard from "../images/dashboard-messaging.png";
import { CgProfile } from "react-icons/cg";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { MoonLoader } from "react-spinners";
import { useDemoLogin } from "../hooks/useDemoLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error } = useLogin();
  const { demoLogin, demoLoading, demoError } = useDemoLogin();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  const handleDemoAccountLogin = async () => {
    await demoLogin("hamza.eshoul.pro@gmail.com", "Hamzahamza1");
  };

  return (
    <section className="h-screen flex">
      {/* Login */}
      <div className="w-[36%] flex flex-col items-center mt-64 gap-6 h-[calc(100%-288px)]">
        {/* Logo */}

        <div className="flex items-center gap-3 mb-14 w-[70%]">
          <div className="h-16 w-16">
            <img src={logo} alt="logo" className="h-full w-full" />
          </div>
          <h1 className="text-2xl font-extrabold"> Odin Messaging App</h1>
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-3 w-[70%]">
          <h2 className="text-5xl font-bold text-[#101828]"> Welcome back</h2>
          <p className="text-[#475467] text-lg">
            New to Odin Messaging App?{" "}
            <Link
              to="/signup"
              className="font-bold text-primaryOrange cursor-pointer"
            >
              Create an account.{" "}
            </Link>
          </p>
        </div>

        {/* Form */}
        <form
          className="text-[#475467] space-y-5 w-[70%]"
          onSubmit={handleLoginSubmit}
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="outline-none border-[1px] rounded-md border-zinc-300 py-1.5 px-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none border-[1px] rounded-md border-zinc-300 py-1.5 px-2"
            />
          </div>

          <button className="h-12 flex justify-center items-center bg-primaryOrange text-white font-semibold rounded-md w-full py-2">
            {loading ? (
              <MoonLoader
                color={"#ffffff"}
                loading={loading}
                size={25}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Log in"
            )}
          </button>
          <button
            type="button"
            className="flex justify-center items-center bg-white gap-2 border-[1px] w-full border-primaryOrange font-semibold  rounded-md py-2"
            onClick={handleDemoAccountLogin}
          >
            {" "}
            <CgProfile className="text-2xl text-primaryOrange" />
            <span>{demoLoading ? "Logging in ..." : "Try a demo account"}</span>
          </button>

          {error && (
            <div className="text-primaryOrange font-semibold text-lg text-center">
              {error}
            </div>
          )}

          {demoError && (
            <div className="text-primaryOrange font-semibold text-lg text-center">
              {demoError}
            </div>
          )}
        </form>
      </div>

      {/* Image */}
      <div className="w-[64%]">
        <img
          src={dashboard}
          alt="login image"
          className="h-full w-full object-fit"
        />
      </div>
    </section>
  );
};

export default Login;
