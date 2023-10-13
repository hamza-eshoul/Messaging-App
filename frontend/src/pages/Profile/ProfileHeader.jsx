import defaultProfile from "../../assets/images/defaultProfile.png";

const ProfileHeader = ({ userProfile }) => {
  return (
    <header className="flex h-[8%] items-center justify-between border-b-[1px] border-zinc-300 px-2 py-1 sm:px-7 ">
      <h1 className="text-sm font-medium sm:text-lg">My Messenging Profile</h1>

      <div className="flex items-center gap-3">
        <div className="h-10 w-10">
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
        </div>
        {userProfile && (
          <span className="text-sm font-medium sm:text-base">
            {" "}
            {userProfile.firstName} {userProfile.lastName}
          </span>
        )}
      </div>
    </header>
  );
};

export default ProfileHeader;
