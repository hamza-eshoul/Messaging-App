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

const profile_connect_links = [
  {
    icon: <AiFillFacebook className="text-xl text-zinc-600" />,
    url: "https://www.facebook.com/www.facebook.com",
    name: "Facebook",
  },
  {
    icon: <AiFillInstagram className="text-xl text-zinc-600" />,
    url: "https://www.instagram.com/",
    name: "Instagram",
  },
  {
    icon: <AiFillTwitterCircle className="text-xl text-zinc-600" />,
    url: "https://twitter.com/",
    name: "Twitter",
  },
];

const ProfileAside = ({ userProfile }) => {
  return (
    <aside className="hidden h-full w-[30%] flex-col gap-6 overflow-auto lg:flex xl:w-[25%]">
      <ProfileCard cardTitle="Employer">
        <div className="flex items-center gap-2 pl-1 text-sm">
          <BsBuildings className="text-xl text-zinc-600" />
          <span className="w-[80%] text-justify font-medium text-zinc-700">
            {userProfile && userProfile.employer ? (
              <>{userProfile.employer}</>
            ) : (
              "The user has not inserted an employer yet"
            )}
          </span>
        </div>
      </ProfileCard>

      <ProfileCard cardTitle="Connect">
        {profile_connect_links.map((link) => (
          <div key={link.name} className="l-1 flex items-center gap-2 text-sm">
            {link.icon}
            <a
              href={link.url}
              target="_blank"
              className="cursor-pointer font-medium text-zinc-700 hover:underline-offset-2"
            >
              {link.name}
            </a>
          </div>
        ))}
      </ProfileCard>

      <SimilarProfiles />
    </aside>
  );
};

export default ProfileAside;
