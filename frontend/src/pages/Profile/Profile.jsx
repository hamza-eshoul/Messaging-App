import { useState } from "react";
import { useFetchProfile } from "../../hooks/useFetchProfile";
import { useParams } from "react-router-dom";

// components
import EditProfileInfo from "../../components/EditProfileInfo";
import Overlay from "../../components/Overlay";

import EditProfileImage from "../../components/EditProfileImage";
import EditCoverImage from "../../components/EditCoverImage";
import Loading from "../../components/Loading";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import ProfileAside from "./ProfileAside";

const Profile = () => {
  const { id } = useParams();
  const [editProfileInfo, setEditProfileInfo] = useState(null);
  const [editProfileImage, setEditProfileImage] = useState(null);
  const [editCoverImage, setEditCoverImage] = useState(null);
  const { userProfile, isLoggedInUser, isPending, error } = useFetchProfile(id);

  if (isPending) {
    return (
      <Loading
        loadingColor={"#eb430b"}
        loadingSize={70}
        loadingHeight={"h-screen"}
      />
    );
  }

  return (
    <section className="flex flex-col w-[calc(100%-96px)] h-full">
      {editProfileInfo && (
        <>
          <Overlay />

          <EditProfileInfo
            setEditProfileInfo={setEditProfileInfo}
            setUserProfile={setUserProfile}
          />
        </>
      )}
      {editProfileImage && (
        <>
          <Overlay />

          <EditProfileImage
            setEditProfileImage={setEditProfileImage}
            setUserProfile={setUserProfile}
          />
        </>
      )}
      {editCoverImage && (
        <>
          <Overlay />
          <EditCoverImage
            setEditCoverImage={setEditCoverImage}
            setUserProfile={setUserProfile}
          />
        </>
      )}

      <ProfileHeader userProfile={userProfile} />
      <section className="flex gap-8 bg-primaryGray flex-grow py-12 pl-20 pr-10 h-[93%]">
        <ProfileBody
          userProfile={userProfile}
          isLoggedInUser={isLoggedInUser}
        />
        <ProfileAside userProfile={userProfile} />
      </section>
    </section>
  );
};

export default Profile;
