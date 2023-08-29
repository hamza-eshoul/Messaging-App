import React, { useEffect, useState } from "react";
import defaultProfile from "../images/defaultProfile.png";
import { ProfileCard } from "../components/ProfileCard";
import { PuffLoader, MoonLoader } from "react-spinners";
import { useFetchUsers } from "../hooks/useFetchUsers";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// icons
import { FaUserEdit, FaEdit } from "react-icons/fa";
import { BsBuildings } from "react-icons/bs";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { BsFillCameraFill, BsCamera2 } from "react-icons/bs";
import { SiPreact } from "react-icons/si";

// components
import EditProfileInfo from "../components/EditProfileInfo";
import Overlay from "../components/Overlay";
import { EditAboutMe } from "../components/EditAboutMe";
import EditProfileImage from "../components/EditProfileImage";
import EditCoverImage from "../components/EditCoverImage";
import { useAuthContext } from "../hooks/useAuthContext";

const Profile = () => {
  const { fetchUsers, loading, error } = useFetchUsers();
  const [transformedUsersList, setTransformedUsersList] = useState(null);
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const { user } = useAuthContext();

  const [editProfileInfo, setEditProfileInfo] = useState(null);
  const [editAboutMe, setEditAboutMe] = useState(null);
  const [editProfileImage, setEditProfileImage] = useState(null);
  const [editCoverImage, setEditCoverImage] = useState(null);
  const [profileLoading, setProfileLoading] = useState(null);
  const [authUserEdit, setAuthUserEdit] = useState(null);

  useEffect(() => {
    setTransformedUsersList(null);
    const fetchUsersList = async () => {
      const usersList = await fetchUsers();
      const shuffledUsersList = usersList.sort(() => Math.random() - 0.5);
      const slicedShuffledUsersList = shuffledUsersList.slice(0, 5);
      setTransformedUsersList(slicedShuffledUsersList);
    };

    fetchUsersList();
  }, [id]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setProfileLoading(true);
      const response = await fetch(`http://localhost:4000/user/${id}`);

      const json = await response.json();

      if (response.ok) {
        setUserProfile(json);
        setProfileLoading(null);

        json._id === user._id ? setAuthUserEdit(true) : setAuthUserEdit(null);
      }
    };

    fetchUserProfile();
  }, [id]);

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

      {editAboutMe && (
        <>
          <Overlay />
          <EditAboutMe
            setEditAboutMe={setEditAboutMe}
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

      {profileLoading ? (
        <div className="h-screen w-full flex justify-center items-center">
          {" "}
          <PuffLoader
            color={"#eb430b"}
            loading={profileLoading}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          {" "}
          {/* Profile Navbar */}
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
          {/* Profile Body */}
          <section className="flex gap-8 bg-primaryGray flex-grow py-12 pl-20 pr-10 h-[93%]">
            {/* Profile Main Info */}
            <div className="flex flex-col gap-6 w-[80%] h-full">
              <div className="bg-white rounded-xl h-[500px] border-[1px] shadow-sm ">
                {/* Image */}
                <div className="h-[55%] w-full relative">
                  {authUserEdit && (
                    <div
                      className="flex z-10 absolute bottom-4 right-4 gap-2 items-center rounded-lg  px-3 py-2 cursor-pointer bg-[#797a7b]/60 hover:bg-zinc-500/80 text-white font-medium"
                      onClick={() => setEditCoverImage(true)}
                    >
                      <BsCamera2 />
                      <button>Edit cover image</button>
                    </div>
                  )}

                  {userProfile && userProfile.coverImg.url ? (
                    <img
                      className="h-full w-full rounded-t-xl object-fit"
                      src={userProfile.coverImg.url}
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-b from-zinc-100 from-70% to-zinc-400/50 rounded-b-lg" />
                  )}

                  <div className="h-40 w-40 absolute bottom-[-60px] left-10 p-1 bg-white rounded-full">
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

                    {authUserEdit && (
                      <div
                        className="absolute right-2 top-[120px] rounded-full bg-zinc-100 hover:bg-zinc-200 w-10 h-10 flex justify-center items-center cursor-pointer"
                        onClick={() => {
                          setEditProfileImage(!editProfileImage);
                        }}
                      >
                        <BsFillCameraFill className="text-2xl" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}

                <div className="ml-56 mt-5 space-y-2">
                  <div className="flex justify-between pr-8">
                    {userProfile && (
                      <h1 className="text-4xl font-medium">
                        {userProfile.firstName} {userProfile.lastName}
                      </h1>
                    )}

                    {authUserEdit ? (
                      <FaEdit
                        className="text-2xl cursor-pointer hover:opacity-50"
                        onClick={() => setEditProfileInfo(!editProfileInfo)}
                      />
                    ) : (
                      <SiPreact className="text-3xl hover:opacity-50 text-zinc-600" />
                    )}
                  </div>

                  <h3 className="text-zinc-500">
                    Profession •{" "}
                    {userProfile && userProfile.profession ? (
                      <span> {userProfile.profession}</span>
                    ) : (
                      <span className="text-zinc-800 italic ">
                        {" "}
                        The User Has Not Inserted A Profession Yet
                      </span>
                    )}{" "}
                    {userProfile && userProfile.employer && (
                      <span> • {userProfile.employer} </span>
                    )}
                  </h3>
                  <h3 className="text-zinc-500">
                    Location •{" "}
                    {userProfile && userProfile.location ? (
                      <span>{userProfile.location}</span>
                    ) : (
                      <span className="text-zinc-800 italic ">
                        {" "}
                        The User Has Not Inserted A Location Yet
                      </span>
                    )}
                  </h3>

                  {/* Main skills */}

                  <div className="flex gap-2 pt-3 items-center">
                    <h3 className="text-zinc-500">Main Skills •</h3>
                    {userProfile && userProfile.skills.length !== 0 ? (
                      <>
                        {userProfile.skills.map((skill) => (
                          <React.Fragment key={skill}>
                            {" "}
                            {skill == "" ? (
                              ""
                            ) : (
                              <div className="profileMainCompetencies">
                                {" "}
                                {skill}{" "}
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                      </>
                    ) : (
                      <span className="text-zinc-800 italic ">
                        {" "}
                        The User Has Not Inserted Main Skills Yet
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border-[1px] shadow-sm p-7 space-y-3 ">
                <div className="flex justify-between items-center">
                  <h1 className="text-4xl font-medium"> About Me </h1>
                  {authUserEdit && (
                    <FaUserEdit
                      className="text-3xl cursor-pointer hover:opacity-50"
                      onClick={() => setEditAboutMe(!editAboutMe)}
                    />
                  )}
                </div>

                {userProfile && userProfile.aboutUser ? (
                  <p className="leading-loose w-[90%] text-justify">
                     {userProfile.aboutUser}
                  </p>
                ) : (
                  <p className="leading-loose w-[90%] text-justify">
                    {" "}
                    The user has not inserted an "About Me" presentation yet ...{" "}
                  </p>
                )}
              </div>
            </div>

            {/* Profile Complementary Info */}
            <section className="w-[20%] flex flex-col gap-6 h-full overflow-auto">
              <ProfileCard cardTitle="Employer">
                <div className="flex gap-2 pl-1 items-center text-sm">
                  <BsBuildings className="text-zinc-600 text-xl" />
                  <h3 className="text-zinc-700 font-medium text-justify w-[80%]">
                    {userProfile && userProfile.employer ? (
                      <>{userProfile.employer}</>
                    ) : (
                      "The user has not inserted an employer yet"
                    )}
                  </h3>
                </div>
              </ProfileCard>

              <ProfileCard cardTitle="Connect">
                <div className="flex gap-2 pl-1 items-center text-sm">
                  <AiFillFacebook className="text-zinc-600 text-xl" />
                  <a
                    href="https://www.facebook.com/www.facebook.com"
                    className="text-zinc-700 font-medium cursor-pointer hover:underline hover:underline-offset-2"
                    target="_blank"
                  >
                    Facebook
                  </a>
                </div>
                <div className="flex gap-2 pl-1 items-center text-sm">
                  <AiFillInstagram className="text-zinc-600 text-xl" />
                  <a
                    href="https://www.instagram.com/"
                    className="text-zinc-700 font-medium cursor-pointer hover:underline  hover:underline-offset-2"
                    target="_blank"
                  >
                    Instagram
                  </a>
                </div>
                <div className="flex gap-2 pl-1 items-center text-sm">
                  <AiFillTwitterCircle className="text-zinc-600 text-xl" />
                  <a
                    href="https://twitter.com/"
                    className="text-zinc-700 font-medium cursor-pointer hover:underline hover:underline-offset-2"
                    target="_blank"
                  >
                    Twitter
                  </a>
                </div>
              </ProfileCard>

              <ProfileCard cardTitle="Similar profiles">
                {loading && (
                  <div className="flex justify-center items-center">
                    {" "}
                    <MoonLoader
                      color={"#1A1B1C"}
                      loading={loading}
                      size={30}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>
                )}
                {error && (
                  <div className="text-primaryDark font-semibold text-lg text-center pt-4">
                    {error}
                  </div>
                )}

                {transformedUsersList &&
                  transformedUsersList.map((user) => (
                    <Link
                      to={`/profile/${user._id}`}
                      key={user._id}
                      className="flex gap-3 items-center py-1.5 cursor-pointer"
                    >
                      {/* image */}
                      <div className="h-12 w-12">
                        <img
                          src={
                            user.profileImg.url
                              ? user.profileImg.url
                              : defaultProfile
                          }
                          className="h-full w-full rounded-full"
                        />
                      </div>
                      {/* profile info */}
                      <div className="flex flex-col gap-1">
                        <h3 className="font-semibold">
                          {user.firstName} {user.lastName}
                        </h3>
                        {user.profession ? (
                          <h4 className="text-sm text-zinc-500">
                            {user.profession}{" "}
                          </h4>
                        ) : (
                          <h4 className="text-sm text-zinc-500">
                            {" "}
                            No profession inserted{" "}
                          </h4>
                        )}
                      </div>
                    </Link>
                  ))}
              </ProfileCard>
            </section>
          </section>
        </>
      )}
    </section>
  );
};

export default Profile;
