// components
import ProfileAboutMe from "./ProfileAboutMe";
import ProfileData from "./ProfileData";

const ProfileBody = ({ userProfile, setUserProfile, isLoggedInUser }) => {
  return (
    <section className="flex h-full w-full flex-col gap-6 overflow-y-auto lg:w-[70%] xl:w-[75%] ">
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
    </section>
  );
};

export default ProfileBody;
