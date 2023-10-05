import logo from "../images/logo.png";

const DefaultMessageInterface = () => {
  return (
    <section className="flex justify-center pt-96 w-[calc(75%-96px)] bg-primaryGray z-[-2]">
      {" "}
      <div className="custom-border glow flex flex-col items-center justify-center gap-5 p-10">
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
