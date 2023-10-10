import React from "react";

// images
import defaultProfile from "../../assets/images/defaultProfile.png";

// icons
import { SiPreact } from "react-icons/si";

// components
import ProfileDataLoggedInUser from "./ProfileDataLoggedInUser";

const ProfileData = ({ userProfile, setUserProfile, isLoggedInUser }) => {
  if (isLoggedInUser && userProfile) {
    return (
      <ProfileDataLoggedInUser
        userProfile={userProfile}
        setUserProfile={setUserProfile}
      />
    );
  }

  if (!isLoggedInUser && userProfile) {
    return (
      <div className="bg-white rounded-xl h-[500px] border-[1px] shadow-sm ">
        <div className="h-[55%] w-full relative">
          {userProfile.coverImg.url && (
            <img
              className="h-full w-full rounded-t-xl object-fit"
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
          </div>
        </div>

        <div className="ml-56 mt-5 space-y-2">
          <div className="flex justify-between pr-8">
            <h1 className="text-4xl font-medium">
              {userProfile.firstName} {userProfile.lastName}
            </h1>

            <SiPreact className="text-3xl hover:opacity-50 text-zinc-600" />
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
    );
  }
};

export default ProfileData;
