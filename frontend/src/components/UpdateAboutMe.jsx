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
    "https://odin-messaging-app-api.onrender.com/users/profile_about"
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

    const updated_user = await updateUser({ aboutText });

    if (!error) {
      setUserProfile(updated_user);
      setIsUpdateAboutMe(false);
    }
  };

  return (
    <form
      className="absolute left-1/2 top-1/2 z-20 flex w-[80%] -translate-x-1/2 -translate-y-1/2 flex-col gap-4  rounded-lg bg-white p-2 shadow-lg sm:w-[480px] sm:p-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2 px-2">
        <header className="flex w-full items-center justify-between border-b-[1px] border-zinc-200 pb-1 ">
          {" "}
          <h3 className="text-xl font-semibold text-primaryOrange sm:text-2xl ">
            {" "}
            About Me{" "}
          </h3>
          <div className="flex items-center gap-2">
            <MdMode
              className="cursor-pointer hover:text-primaryOrange sm:text-xl "
              onClick={() => {
                setIsUpdateAboutText(true);
              }}
            />
            <div
              className="flex cursor-pointer items-center justify-center rounded-full bg-zinc-100 p-1.5 hover:bg-zinc-200"
              onClick={() => {
                setIsUpdateAboutMe(false);
              }}
            >
              <RxCross1 className="text-zinc-600 sm:text-lg" />
            </div>
          </div>
        </header>

        {isUpdateAboutText && (
          <textarea
            placeholder="About Me Text"
            className="mt-1 resize-none rounded border-[2px] border-primaryOrange p-2 text-justify text-sm leading-relaxed outline-none sm:text-[16px]"
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
          />
        )}

        {!isUpdateAboutText && (
          <p className="pt-1 text-justify text-sm leading-relaxed sm:text-[16px]">
            {userProfile.aboutUser}
          </p>
        )}
      </div>
      {isPending && <Loading loadingColor={"#fa4d12"} />}
      {error && <Error error={error} />}
      {!isPending && !error && (
        <footer className="flex items-center justify-center">
          <button className="flex items-center justify-center rounded bg-primaryOrange px-1.5 py-2 text-sm font-semibold text-white sm:px-4 sm:text-base">
            {" "}
            Save Changes
          </button>
        </footer>
      )}
    </form>
  );
};

export default UpdateAboutMe;
