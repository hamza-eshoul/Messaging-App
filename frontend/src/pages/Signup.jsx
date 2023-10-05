import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";

// images
import dashboard from "../images/dashboard-messaging.png";
import logo from "../images/logo.png";

// components
import Loading from "../components/Loading";
import Error from "../components/Error";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, isPending, error } = useSignup();

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    await signup(firstName, lastName, email, password);
  };

  return (
    <section className="h-screen flex">
      {/* Login */}
      <div className="w-[36%] flex flex-col items-center mt-40 gap-6 h-[calc(100%-288px)]">
        {/* Logo */}

        <div className="flex items-center gap-3 mb-14 w-[70%]">
          <div className="h-16 w-16">
            <img src={logo} alt="logo" className="h-full w-full" />
          </div>
          <h1 className="text-2xl font-extrabold"> Odin Messaging App</h1>
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-3 w-[70%]">
          <h2 className="text-5xl font-bold text-[#101828]"> Sign up</h2>
          <p className="text-[#475467] text-lg">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-primaryOrange cursor-pointer"
            >
              Login.{" "}
            </Link>
          </p>
        </div>

        {/* Form */}
        <form
          className="text-[#475467] space-y-5 w-[70%]"
          onSubmit={handleSignupSubmit}
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">First name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              className="outline-none border-[1px] rounded-md border-zinc-300 py-1.5 px-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Last name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              className="outline-none border-[1px] rounded-md border-zinc-300 py-1.5 px-2"
            />
          </div>

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
            {isPending ? (
              <Loading loadingColor="#ffffff" loadingSize={30} />
            ) : (
              "Sign up"
            )}
          </button>

          {error && (
            <Error
              error={error}
              errorColor={"text-primaryOrange"}
              errorSize={"text-lg"}
            />
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

export default Signup;
