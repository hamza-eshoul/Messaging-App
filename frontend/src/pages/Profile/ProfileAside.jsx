// icons
import { BsBuildings } from "react-icons/bs";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
} from "react-icons/ai";

// components
import SimilarProfiles from "./SimilarProfiles";
import ProfileCard from "./ProfileCard";

const ProfileAside = ({ userProfile }) => {
  return (
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

      <SimilarProfiles />
    </section>
  );
};

export default ProfileAside;
