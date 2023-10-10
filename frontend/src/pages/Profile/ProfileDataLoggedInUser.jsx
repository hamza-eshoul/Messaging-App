import React from "react";
import { useState } from "react";

// images
import defaultProfile from "../../assets/images/defaultProfile.png";

// icons
import { FaEdit } from "react-icons/fa";
import { BsFillCameraFill, BsCamera2 } from "react-icons/bs";

// components
import Overlay from "../../components/Overlay";
import UpdateProfileData from "../../components/UpdateProfileData";
import UpdateProfileCoverImage from "../../components/UpdateProfileCoverImage";
import UpdateProfileImage from "../../components/UpdateProfileImage";

const ProfileDataLoggedInUser = ({ userProfile, setUserProfile }) => {
  const [isUpdateProfileData, setIsUpdateProfileData] = useState(false);
  const [isUpdateProfileImage, setIsUpdateProfileImage] = useState(false);
  const [isUpdateCoverImage, setIsUpdateCoverImage] = useState(false);

  const updateProps = {
    userProfile,
    setUserProfile,
  };

  return (
    <>
      {isUpdateProfileData || isUpdateProfileImage || isUpdateCoverImage ? (
        <Overlay />
      ) : (
        ""
      )}

      {isUpdateProfileData && (
        <UpdateProfileData
          {...updateProps}
          setIsUpdateProfileData={setIsUpdateProfileData}
        />
      )}

      {isUpdateCoverImage && (
        <UpdateProfileCoverImage
          {...updateProps}
          setIsUpdateCoverImage={setIsUpdateCoverImage}
        />
      )}

      {isUpdateProfileImage && (
        <UpdateProfileImage
          {...updateProps}
          setIsUpdateProfileImage={setIsUpdateProfileImage}
        />
      )}

      <div className="bg-white rounded-xl h-[500px] border-[1px] shadow-sm ">
        <div className="h-[55%] w-full relative">
          <div
            className="flex z-10 absolute bottom-4 right-4 gap-2 items-center rounded-lg  px-3 py-2 cursor-pointer bg-[#797a7b]/60 hover:bg-zinc-500/80 text-white font-medium"
            onClick={() => setIsUpdateCoverImage(true)}
          >
            <BsCamera2 />
            <button>Edit cover image</button>
          </div>

          {userProfile.coverImg.url && (
            <img
              className="h-full w-full rounded-t-xl object-fill"
              src={userProfile.coverImg.url}
            />
          )}
          {!userProfile.coverImg.url && (
            <div className="h-full w-full bg-gradient-to-b from-zinc-100 from-70% to-zinc-400/50 rounded-b-lg" />
          )}

          <div className="h-40 w-40 absolute bottom-[-60px] left-10 p-1 bg-white rounded-full">
            <img
              src={
                userProfile.profileImg.url
                  ? userProfile.profileImg.url
                  : defaultProfile
              }
              className="h-full w-full rounded-full"
            />

            <div
              className="absolute right-2 top-[120px] rounded-full bg-zinc-100 hover:bg-zinc-200 w-10 h-10 flex justify-center items-center cursor-pointer"
              onClick={() => {
                setIsUpdateProfileImage(true);
              }}
            >
              <BsFillCameraFill className="text-2xl" />
            </div>
          </div>
        </div>

        <div className="ml-56 mt-5 space-y-2">
          <div className="flex justify-between pr-8">
            <h1 className="text-4xl font-medium">
              {userProfile.firstName} {userProfile.lastName}
            </h1>

            <FaEdit
              className="text-2xl cursor-pointer hover:opacity-50"
              onClick={() => setIsUpdateProfileData(true)}
            />
          </div>

          <h3 className="text-zinc-500">
            Profession •
            {userProfile.profession && <span> {userProfile.profession}</span>}
            {!userProfile.profession && (
              <span className="text-zinc-800 italic ">
                {" "}
                The User Has Not Inserted A Profession Yet
              </span>
            )}
            {userProfile.employer && <span> • {userProfile.employer} </span>}
          </h3>
          <h3 className="text-zinc-500">
            Location •{" "}
            {userProfile.location && <span>{userProfile.location}</span>}
            {!userProfile.location && (
              <span className="text-zinc-800 italic ">
                {" "}
                The User Has Not Inserted A Location Yet
              </span>
            )}
          </h3>

          {/* Main skills */}

          <div className="flex gap-2 pt-3 items-center">
            <h3 className="text-zinc-500">Main Skills •</h3>
            {userProfile.skills.length !== 0 && (
              <>
                {userProfile.skills.map((skill) => (
                  <React.Fragment key={skill}>
                    {" "}
                    {skill == "" ? (
                      ""
                    ) : (
                      <div className="profileMainCompetencies"> {skill} </div>
                    )}
                  </React.Fragment>
                ))}
              </>
            )}
            {userProfile.skills.length == 0 && (
              <span className="text-zinc-800 italic ">
                {" "}
                The User Has Not Inserted Main Skills Yet
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDataLoggedInUser;
