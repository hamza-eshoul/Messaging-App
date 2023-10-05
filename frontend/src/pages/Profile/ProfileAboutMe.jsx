import { useState } from "react";
import { FaUserEdit } from "react-icons/fa";

// components
import Overlay from "../../components/Overlay";
import EditAboutMe from "../../components/EditAboutMe";

const ProfileAboutMe = ({ userProfile, isLoggedInUser }) => {
  const [editAboutMe, setEditAboutMe] = useState(null);
  return (
    <>
      {editAboutMe && (
        <>
          <Overlay />
          <EditAboutMe
            setEditAboutMe={setEditAboutMe}
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
              onClick={() => setEditAboutMe(!editAboutMe)}
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
