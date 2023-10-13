import { useParams } from "react-router-dom";
import { useFetchProfile } from "../../hooks/useFetchProfile";

// components
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import ProfileAside from "./ProfileAside";

const Profile = ({ user }) => {
  const { id } = useParams();
  const { userProfile, isLoggedInUser, isPending, error, setUserProfile } =
    useFetchProfile(id, user);

  if (isPending) {
    return (
      <Loading
        loadingColor={"#eb430b"}
        loadingSize={55}
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
    <main className="mb-[48px] flex h-screen flex-col xmd:mb-0 xmd:ml-[96px]">
      <ProfileHeader userProfile={userProfile} />
      <section className="flex h-[92%] gap-8 bg-primaryGray px-3 py-12 sm:pl-10 sm:pr-10 lg:pl-20">
        <ProfileBody
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          isLoggedInUser={isLoggedInUser}
        />
        <ProfileAside userProfile={userProfile} />
      </section>
    </main>
  );
};

export default Profile;
