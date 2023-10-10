// components
import ProfileAboutMe from "./ProfileAboutMe";
import ProfileData from "./ProfileData";

const ProfileBody = ({ userProfile, setUserProfile, isLoggedInUser }) => {
  return (
    <div className="flex flex-col gap-6 w-[80%] h-full">
      <ProfileData
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        isLoggedInUser={isLoggedInUser}
      />

      <ProfileAboutMe
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        isLoggedInUser={isLoggedInUser}
      />
    </div>
  );
};

export default ProfileBody;
