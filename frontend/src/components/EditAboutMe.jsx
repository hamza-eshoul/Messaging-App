import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { MdMode } from "react-icons/md";
import { MoonLoader } from "react-spinners";
import { useAuthContext } from "../hooks/useAuthContext";

export const EditAboutMe = ({ setEditAboutMe, setUserProfile }) => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const [aboutMe, setAboutMe] = useState("");

  const [editAbout, setEditAbout] = useState(null);
  const { user, dispatch } = useAuthContext();

  useEffect(() => {
    if (user.aboutUser) {
      setAboutMe(user.aboutUser);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const user_id = user._id;

    const response = await fetch("http://localhost:4000/user/user_about", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        aboutMe,
      }),
    });

    const json = await response.json();

    if (response.ok) {
      setIsLoading(false);
      setEditAboutMe(null);
      dispatch({ type: "update_user", payload: json });
      setUserProfile(json);
    }

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
  };
  return (
    <form
      className="flex flex-col w-[500px] rounded-lg absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-20 bg-white shadow-lg p-4 gap-4"
      onSubmit={handleSubmit}
    >
      {/* Header */}
      <header className="flex border-b-[1px] border-zinc-200 justify-center items-center pb-3">
        <h1 className="text-2xl font-semibold mx-auto"> Edit About Me </h1>
        <div
          className="bg-zinc-100 hover:bg-zinc-200 rounded-full p-2 flex justify-center items-center cursor-pointer"
          onClick={() => {
            setEditAboutMe(null);
          }}
        >
          <RxCross1 className="text-zinc-600 text-xl" />
        </div>
      </header>
      {/* Edit About Me */}
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
              setEditAbout(!editAbout);
            }}
          />
        </div>

        {editAbout ? (
          <textarea
            placeholder="About Me Text"
            className="resize-none mt-1 border-primaryOrange border-[2px] rounded outline-none text-justify p-2 leading-relaxed"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
          />
        ) : (
          <div className="pt-1 text-justify leading-relaxed">{aboutMe}</div>
        )}
      </section>
      {/* Post Button */}{" "}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <MoonLoader
            color={"#fa4d12"}
            loading={isLoading}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <button className="h-12 flex justify-center items-center bg-primaryOrange text-white font-semibold rounded-md  py-2 w-1/2">
            {" "}
            Save Changes
          </button>
        </div>
      )}
      {error && (
        <div className="text-red-500 font-semibold text-xl text-center">
          {error}
        </div>
      )}
    </form>
  );
};
