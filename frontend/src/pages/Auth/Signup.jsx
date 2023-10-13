import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";

// images
import dashboard from "../../assets/images/dashboard-messaging.png";
import logo from "../../assets/images/logo.png";

// components
import Loading from "../../components/Loading";
import Error from "../../components/Error";

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
    <main className="flex h-screen w-full">
      <section className="mx-auto flex flex-col justify-center px-4 xl:w-[40%] xl:px-20 2xl:px-[112px] ">
        <div className="space-y-6 rounded-lg border-[1px] px-8 py-6 xsm:w-[500px] sm:p-12 xl:w-auto xl:border-[0px] xl:p-0">
          <header className="mb-14 flex items-center gap-3">
            <img src={logo} alt="logo" className="h-16 w-16" />

            <h1 className="text-xl font-extrabold sm:text-3xl">
              {" "}
              Odin Messaging App
            </h1>
          </header>

          <div className="flex flex-col gap-3 ">
            <h2 className="text-3xl font-bold text-[#101828] sm:text-5xl">
              Sign up
            </h2>
            <p className="text-justify text-[#475467] sm:text-lg">
              Already have an account?{" "}
              <Link
                to="/login"
                className="cursor-pointer font-bold text-primaryOrange"
              >
                Login.{" "}
              </Link>
            </p>
          </div>

          <form
            className="space-y-5 text-[#475467]"
            onSubmit={handleSignupSubmit}
          >
            <label className="form_label">
              <span className="text-sm font-bold">First name</span>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                className="auth_input"
              />
            </label>

            <label className="form_label">
              <span className="text-sm font-bold">Last name </span>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                className="auth_input"
              />
            </label>

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
                "Sign up"
              )}
            </button>

            {error && (
              <Error
                error={error}
                errorColor={"text-primaryOrange"}
                errorSize={"sm:text-lg"}
              />
            )}
          </form>
        </div>
      </section>

      {/* Image */}
      <section className="hidden w-[60%] xl:block">
        <img src={dashboard} alt="login image" className="h-full w-full" />
      </section>
    </main>
  );
};

export default Signup;
