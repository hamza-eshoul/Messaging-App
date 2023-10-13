import { useState } from "react";

// icons
import { FaUserEdit } from "react-icons/fa";

// components
import Overlay from "../../components/Overlay";
import UpdateAboutMe from "../../components/UpdateAboutMe";

const ProfileAboutMe = ({ userProfile, setUserProfile, isLoggedInUser }) => {
  const [isUpdateAboutMe, setIsUpdateAboutMe] = useState(false);

  return (
    <>
      {isUpdateAboutMe && (
        <>
          <Overlay />
          <UpdateAboutMe
            setIsUpdateAboutMe={setIsUpdateAboutMe}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
          />
        </>
      )}

      <div className="space-y-3 rounded-xl border-[1px] bg-white p-7 shadow-sm ">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium sm:text-4xl"> About Me </h2>
          {isLoggedInUser && (
            <FaUserEdit
              className="cursor-pointer text-2xl hover:opacity-50 sm:text-3xl"
              onClick={() => setIsUpdateAboutMe(!isUpdateAboutMe)}
            />
          )}
        </div>

        {userProfile && userProfile.aboutUser ? (
          <p className="w-[90%] text-justify text-sm leading-loose sm:text-[16px]">
             {userProfile.aboutUser}
          </p>
        ) : (
          <p className="w-[90%] text-justify text-sm leading-loose sm:text-base">
            {" "}
            The user has not inserted an "About Me" presentation yet ...{" "}
          </p>
        )}
      </div>
    </>
  );
};

export default ProfileAboutMe;
