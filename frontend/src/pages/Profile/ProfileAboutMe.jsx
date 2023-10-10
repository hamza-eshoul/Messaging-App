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

      <div className="bg-white rounded-xl border-[1px] shadow-sm p-7 space-y-3 ">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-medium"> About Me </h1>
          {isLoggedInUser && (
            <FaUserEdit
              className="text-3xl cursor-pointer hover:opacity-50"
              onClick={() => setIsUpdateAboutMe(!isUpdateAboutMe)}
            />
          )}
        </div>

        {userProfile && userProfile.aboutUser ? (
          <p className="leading-loose w-[90%] text-justify">
             {userProfile.aboutUser}
          </p>
        ) : (
          <p className="leading-loose w-[90%] text-justify">
            {" "}
            The user has not inserted an "About Me" presentation yet ...{" "}
          </p>
        )}
      </div>
    </>
  );
};

export default ProfileAboutMe;
