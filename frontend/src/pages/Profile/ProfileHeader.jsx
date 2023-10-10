import defaultProfile from "../../assets/images/defaultProfile.png";

const ProfileHeader = ({ userProfile }) => {
  return (
    <div className="flex items-center justify-between border-b-[1px] border-zinc-300 px-7 h-[7%] ">
      <p className="text-lg font-medium">My Messenging Profile</p>

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
          <span className="font-medium">
            {" "}
            {userProfile.firstName} {userProfile.lastName}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
