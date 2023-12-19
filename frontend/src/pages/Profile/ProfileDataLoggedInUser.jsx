import { useState } from "react";

// images
import defaultProfile from "../../assets/images/defaultProfile.png";

// icons
import { FaEdit } from "react-icons/fa";
import { BsFillCameraFill, BsCamera2 } from "react-icons/bs";
import { SiPreact } from "react-icons/si";

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

      <div className="rounded-xl border-[1px] bg-white shadow-sm sm:pb-3 ">
        <div className="relative h-[200px] w-full  sm:h-[300px]">
          <div
            className="absolute bottom-4 right-4 z-10 flex cursor-pointer items-center gap-2  rounded-lg bg-[#797a7b]/60 px-3 py-2 font-medium text-white hover:bg-zinc-500/80"
            onClick={() => setIsUpdateCoverImage(true)}
          >
            <BsCamera2 />
            <button className="hidden text-sm sm:block sm:text-base">
              Edit cover image
            </button>
          </div>

          {userProfile.coverImg.url && (
            <img
              className="h-full w-full rounded-t-xl object-fill"
              src={userProfile.coverImg.url}
            />
          )}
          {!userProfile.coverImg.url && (
            <div className="h-full w-full rounded-b-lg bg-gradient-to-b from-zinc-100 from-70% to-zinc-400/50" />
          )}

          <div className="absolute bottom-[-60px] left-10 h-32 w-32 rounded-full bg-white p-1 sm:h-40 sm:w-40">
            <img
              src={
                userProfile.profileImg.url
                  ? userProfile.profileImg.url
                  : defaultProfile
              }
              className="h-full w-full rounded-full"
            />

            <div
              className="absolute right-2 top-[90px] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 sm:top-[120px]"
              onClick={() => {
                setIsUpdateProfileImage(true);
              }}
            >
              <BsFillCameraFill className="text-2xl" />
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-2 p-7 sm:ml-56 sm:mt-5 sm:p-2">
          <div className="flex items-center justify-between sm:pr-8">
            <h2 className="text-2xl font-medium sm:text-4xl">
              {userProfile.firstName} {userProfile.lastName}
            </h2>

            {userProfile.firstName + userProfile.lastName == "HamzaEshoul" && (
              <SiPreact className="cursor-pointer text-xl hover:opacity-50 sm:text-3xl" />
            )}

            {userProfile.firstName + userProfile.lastName !== "HamzaEshoul" && (
              <FaEdit
                className="cursor-pointer text-xl hover:opacity-50 sm:text-2xl"
                onClick={() => setIsUpdateProfileData(true)}
              />
            )}
          </div>

          <div className="text-sm text-zinc-500 sm:text-base">
            Profession •
            {userProfile.profession && <span> {userProfile.profession}</span>}
            {!userProfile.profession && (
              <span className="italic text-zinc-800 ">
                {" "}
                The User Has Not Inserted A Profession Yet
              </span>
            )}
            {userProfile.employer && <span> • {userProfile.employer} </span>}
          </div>
          <div className="text-sm text-zinc-500 sm:text-base">
            Location •{" "}
            {userProfile.location && <span>{userProfile.location}</span>}
            {!userProfile.location && (
              <span className="italic text-zinc-800 ">
                {" "}
                The User Has Not Inserted A Location Yet
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-3 text-sm sm:text-base">
            <span className="text-zinc-500">Main Skills •</span>
            {userProfile.skills.length !== 0 && (
              <ul className="flex flex-wrap gap-3">
                {userProfile.skills.map((skill) => (
                  <li key={skill} className="profileMainCompetencies">
                    {" "}
                    {skill == "" ? "" : <>{skill} </>}
                  </li>
                ))}
              </ul>
            )}
            {userProfile.skills.length == 0 && (
              <span className="italic text-zinc-800 ">
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
