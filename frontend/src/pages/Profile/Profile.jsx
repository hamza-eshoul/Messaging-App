import { useParams } from "react-router-dom";
import { useFetchProfile } from "../../hooks/useFetchProfile";

// components
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import ProfileAside from "./ProfileAside";

const Profile = () => {
  const { id } = useParams();
  const { userProfile, isLoggedInUser, isPending, error, setUserProfile } =
    useFetchProfile(id);

  if (isPending) {
    return (
      <Loading
        loadingColor={"#eb430b"}
        loadingSize={70}
        loadingHeight={"h-screen"}
      />
    );
  }

  if (error) {
    return (
      <Error
        error={error}
        errorHeight={"h-screen"}
        errorColor={"text-[#eb430b]"}
        errorSize={"text-lg"}
      />
    );
  }

  return (
    <section className="flex flex-col w-[calc(100%-96px)] h-full">
      <ProfileHeader userProfile={userProfile} />
      <section className="flex gap-8 bg-primaryGray flex-grow py-12 pl-20 pr-10 h-[93%]">
        <ProfileBody
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          isLoggedInUser={isLoggedInUser}
        />
        <ProfileAside userProfile={userProfile} />
      </section>
    </section>
  );
};

export default Profile;
