import React from "react";

// images
import defaultProfile from "../../images/defaultProfile.png";

// icons
import { FaEdit } from "react-icons/fa";
import { BsFillCameraFill, BsCamera2 } from "react-icons/bs";
import { SiPreact } from "react-icons/si";
import ProfileAboutMe from "./ProfileAboutMe";

const ProfileBody = ({ userProfile, isLoggedInUser }) => {
  return (
    <div className="flex flex-col gap-6 w-[80%] h-full">
      <div className="bg-white rounded-xl h-[500px] border-[1px] shadow-sm ">
        <div className="h-[55%] w-full relative">
          {isLoggedInUser && (
            <div
              className="flex z-10 absolute bottom-4 right-4 gap-2 items-center rounded-lg  px-3 py-2 cursor-pointer bg-[#797a7b]/60 hover:bg-zinc-500/80 text-white font-medium"
              onClick={() => setEditCoverImage(true)}
            >
              <BsCamera2 />
              <button>Edit cover image</button>
            </div>
          )}

          {userProfile && userProfile.coverImg.url ? (
            <img
              className="h-full w-full rounded-t-xl object-fit"
              src={userProfile.coverImg.url}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-b from-zinc-100 from-70% to-zinc-400/50 rounded-b-lg" />
          )}

          <div className="h-40 w-40 absolute bottom-[-60px] left-10 p-1 bg-white rounded-full">
            {userProfile && (
              <img
                src={
                  userProfile.profileImg.url
                    ? userProfile.profileImg.url
                    : defaultProfile
                }
                className="h-full w-full rounded-full"
              />
            )}

            {isLoggedInUser && (
              <div
                className="absolute right-2 top-[120px] rounded-full bg-zinc-100 hover:bg-zinc-200 w-10 h-10 flex justify-center items-center cursor-pointer"
                onClick={() => {
                  setEditProfileImage(!editProfileImage);
                }}
              >
                <BsFillCameraFill className="text-2xl" />
              </div>
            )}
          </div>
        </div>

        <div className="ml-56 mt-5 space-y-2">
          <div className="flex justify-between pr-8">
            {userProfile && (
              <h1 className="text-4xl font-medium">
                {userProfile.firstName} {userProfile.lastName}
              </h1>
            )}

            {isLoggedInUser ? (
              <FaEdit
                className="text-2xl cursor-pointer hover:opacity-50"
                onClick={() => setEditProfileInfo(!editProfileInfo)}
              />
            ) : (
              <SiPreact className="text-3xl hover:opacity-50 text-zinc-600" />
            )}
          </div>

          <h3 className="text-zinc-500">
            Profession •{" "}
            {userProfile && userProfile.profession ? (
              <span> {userProfile.profession}</span>
            ) : (
              <span className="text-zinc-800 italic ">
                {" "}
                The User Has Not Inserted A Profession Yet
              </span>
            )}{" "}
            {userProfile && userProfile.employer && (
              <span> • {userProfile.employer} </span>
            )}
          </h3>
          <h3 className="text-zinc-500">
            Location •{" "}
            {userProfile && userProfile.location ? (
              <span>{userProfile.location}</span>
            ) : (
              <span className="text-zinc-800 italic ">
                {" "}
                The User Has Not Inserted A Location Yet
              </span>
            )}
          </h3>

          {/* Main skills */}

          <div className="flex gap-2 pt-3 items-center">
            <h3 className="text-zinc-500">Main Skills •</h3>
            {userProfile && userProfile.skills.length !== 0 ? (
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
            ) : (
              <span className="text-zinc-800 italic ">
                {" "}
                The User Has Not Inserted Main Skills Yet
              </span>
            )}
          </div>
        </div>
      </div>

      <ProfileAboutMe
        userProfile={userProfile}
        isLoggedInUser={isLoggedInUser}
      />
    </div>
  );
};

export default ProfileBody;
