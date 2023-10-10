import { useEffect, useState } from "react";
import { useUpdateUser } from "../hooks/useUpdateUser";

// icons
import { RxCross1 } from "react-icons/rx";
import { MdMode } from "react-icons/md";

// components
import Loading from "./Loading";
import Error from "./Error";

const UpdateAboutMe = ({ userProfile, setIsUpdateAboutMe, setUserProfile }) => {
  const [aboutText, setAboutText] = useState("");
  const [isUpdateAboutText, setIsUpdateAboutText] = useState(false);

  const { updateUser, isPending, error } = useUpdateUser(
    "http://localhost:4000/user/user_about"
  );

  useEffect(() => {
    const initiliazeUserData = () => {
      if (userProfile.aboutUser) {
        setAboutText(userProfile.aboutUser);
      }
    };
    initiliazeUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = userProfile._id;

    const updated_user = await updateUser({ user_id, aboutText });

    if (!error) {
      setUserProfile(updated_user);
      setIsUpdateAboutMe(false);
    }
  };
  return (
    <form
      className="flex flex-col w-[500px] rounded-lg absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-20 bg-white shadow-lg p-4 gap-4"
      onSubmit={handleSubmit}
    >
      <header className="flex border-b-[1px] border-zinc-200 justify-center items-center pb-3">
        <h1 className="text-2xl font-semibold mx-auto"> Edit About Me </h1>
        <div
          className="bg-zinc-100 hover:bg-zinc-200 rounded-full p-2 flex justify-center items-center cursor-pointer"
          onClick={() => {
            setIsUpdateAboutMe(false);
          }}
        >
          <RxCross1 className="text-zinc-600 text-xl" />
        </div>
      </header>

      <section className="flex flex-col gap-2 px-2  pb-3">
        <div className="flex justify-between items-center border-b-[1px] border-zinc-200 w-full ">
          {" "}
          <h1 className="text-2xl font-semibold text-primaryOrange ">
            {" "}
            About Me{" "}
          </h1>
          <MdMode
            className="text-xl cursor-pointer hover:text-primaryOrange "
            onClick={() => {
              setIsUpdateAboutText(true);
            }}
          />
        </div>

        {isUpdateAboutText && (
          <textarea
            placeholder="About Me Text"
            className="resize-none mt-1 border-primaryOrange border-[2px] rounded outline-none text-justify p-2 leading-relaxed"
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
          />
        )}

        {!isUpdateAboutText && (
          <div className="pt-1 text-justify leading-relaxed">
            {userProfile.aboutUser}
          </div>
        )}
      </section>

      {isPending && <Loading />}
      {error && <Error error={error} />}
      {!isPending && !error && (
        <div className="flex justify-center items-center">
          <button className="h-12 flex justify-center items-center bg-primaryOrange text-white font-semibold rounded-md  py-2 w-1/2">
            {" "}
            Save Changes
          </button>
        </div>
      )}
    </form>
  );
};

export default UpdateAboutMe;
