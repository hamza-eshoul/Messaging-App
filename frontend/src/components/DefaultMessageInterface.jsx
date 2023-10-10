import logo from "../assets/images/logo.png";

const DefaultMessageInterface = () => {
  return (
    <section className="flex justify-center w-[calc(75%-96px)] h-screen items-center bg-primaryGray z-[-2]">
      {" "}
      <div className="border-[2px] w-[40%] h-[30%] border-primaryOrange flex flex-col items-center p-6 justify-center gap-5 bg-white shadow-xl">
        <div>
          <img src={logo} />
        </div>
        <h2 className="text-4xl font-medium text-center">
          Welcome to the Odin Messaging App !
        </h2>
      </div>
    </section>
  );
};

export default DefaultMessageInterface;
