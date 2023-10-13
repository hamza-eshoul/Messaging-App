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
      <div className="rounded-xl border-[1px] bg-white shadow-sm sm:pb-3 ">
        <div className="relative h-[200px] w-full  sm:h-[300px]">
          {userProfile.coverImg.url && (
            <img
              className="object-fit h-full w-full rounded-t-xl"
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
          </div>
        </div>

        <div className="mt-10 space-y-2 p-7 sm:ml-56 sm:mt-5 sm:p-2">
          <div className="flex items-center justify-between sm:pr-8">
            <h2 className="text-2xl font-medium sm:text-4xl">
              {userProfile.firstName} {userProfile.lastName}
            </h2>

            <SiPreact className="cursor-pointer text-xl hover:opacity-50 sm:text-2xl" />
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
                  <li className="profileMainCompetencies" key={skill}>
                    {skill == "" ? "" : <> {skill} </>}
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
    );
  }
};

export default ProfileData;
