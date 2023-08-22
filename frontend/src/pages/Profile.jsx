import React, { useEffect, useState } from "react";
import defaultProfile from "../images/defaultProfile.png";
import blue from "../images/blue.jpg";
import { BsThreeDotsVertical, BsBuildings } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { ProfileCard } from "../components/ProfileCard";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { MoonLoader } from "react-spinners";

import { useFetchUsers } from "../hooks/useFetchUsers";

const Profile = () => {
  const { loading, error, usersList } = useFetchUsers();
  const [transformedUsersList, setTransformedUsersList] = useState(null);

  useEffect(() => {
    if (usersList) {
      setTransformedUsersList(usersList.slice(0, 5));
    }
  }, [usersList]);

  return (
    <section className="flex flex-col w-[calc(100%-96px)]">
      {/* Profile Navbar */}
      <div className="flex items-center justify-between border-b-[1px] border-zinc-300 py-4 px-7 ">
        <p className="text-lg font-medium">My Messenging Profile</p>

        <div className="flex items-center gap-3">
          <div className="flex gap-3">
            <BsThreeDotsVertical className="text-zinc-400" />
            <BsThreeDotsVertical className="text-zinc-400" />
          </div>

          <span className="bg-zinc-200/80 w-[1.5px] h-8" />

          <div className="h-10 w-10">
            <img src={defaultProfile} className="h-full w-full rounded-full" />
          </div>
          <span className="font-medium"> Hamza Eshoul</span>
        </div>
      </div>

      {/* Profile Body */}

      <section className="flex gap-8 bg-primaryGray flex-grow py-12 px-24">
        {/* Profile Main Info */}
        <div className="flex flex-col gap-6 w-[80%]">
          <div className="bg-white rounded-xl h-[500px] border-[1px] shadow-sm ">
            {/* Image */}
            <div className="h-[55%] w-full relative">
              <img src={blue} className="h-full w-full rounded-t-xl" />
              <div className="h-40 w-40 absolute bottom-[-60px] left-10 p-1 bg-white rounded-full">
                <img
                  src={defaultProfile}
                  className="h-full w-full rounded-full"
                />
              </div>
            </div>

            {/* Info */}

            <div className="ml-56 mt-5 space-y-2">
              <div className="flex justify-between pr-8">
                <h1 className="text-4xl font-medium">Hamza Eshoul</h1>
                <BsThreeDotsVertical className="text-xl" />
              </div>

              <h3 className="text-zinc-500">
                Profession • Software Engineer at Facebook{" "}
              </h3>
              <h3 className="text-zinc-500">Location • Morroco, Rabat </h3>

              {/* Main competencies */}
              <div className="flex gap-2 pt-4">
                <div className="profileMainCompetencies">UX Research</div>
                <div className="profileMainCompetencies">CX Strategy</div>
                <div className="profileMainCompetencies">
                  Project Management
                </div>
              </div>
            </div>
            {/* Image */}

            {/* Info */}
          </div>

          <div className="bg-white rounded-xl border-[1px] shadow-sm p-7 space-y-3 ">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-medium"> About Me </h1>
              <FaUserEdit className="text-3xl cursor-pointer hover:text-zinc-500 transition duration-300" />
            </div>

            <p className="leading-loose ">
              Hi, my name is Hamza Eshoul,
              <br />I am a software engineer, located in Morroco Rabat.
              <br />
              The main professionals skills that I have under my belt are : UX
              Research, CX Strategy and Project Management
            </p>
          </div>
        </div>

        {/* Profile Complementary Info */}
        <section className="w-[20%] flex flex-col gap-6">
          <ProfileCard cardTitle="Employer">
            <div className="flex gap-2 pl-1 items-center text-sm">
              <BsBuildings className="text-zinc-600 text-xl" />
              <h3 className="text-zinc-700 font-medium">
                Facebook Incorporation
              </h3>
            </div>
          </ProfileCard>

          <ProfileCard cardTitle="Connect">
            <div className="flex gap-2 pl-1 items-center text-sm">
              <AiFillFacebook className="text-zinc-600 text-xl" />
              <a
                href="https://www.facebook.com/www.facebook.com"
                className="text-zinc-700 font-medium cursor-pointer hover:underline hover:underline-offset-2"
              >
                Facebook
              </a>
            </div>
            <div className="flex gap-2 pl-1 items-center text-sm">
              <AiFillInstagram className="text-zinc-600 text-xl" />
              <a
                href="https://www.instagram.com/"
                className="text-zinc-700 font-medium cursor-pointer hover:underline  hover:underline-offset-2"
              >
                Instagram
              </a>
            </div>
            <div className="flex gap-2 pl-1 items-center text-sm">
              <AiFillTwitterCircle className="text-zinc-600 text-xl" />
              <a
                href="https://twitter.com/"
                className="text-zinc-700 font-medium cursor-pointer hover:underline hover:underline-offset-2"
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
                <div key={user._id} className="flex gap-3 items-center py-1.5">
                  {/* image */}
                  <div className="h-12 w-12">
                    <img
                      src={defaultProfile}
                      className="h-full w-full rounded-full"
                    />
                  </div>
                  {/* profile info */}
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold">
                      {user.firstName} {user.lastName}
                    </h3>
                    <h4 className="text-sm text-zinc-500">Industry </h4>
                  </div>
                </div>
              ))}
          </ProfileCard>
        </section>
      </section>
    </section>
  );
};

export default Profile;
