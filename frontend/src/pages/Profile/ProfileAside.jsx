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
    icon: <AiFillFacebook className="text-zinc-600 text-xl" />,
    url: "https://www.facebook.com/www.facebook.com",
    name: "Facebook",
  },
  {
    icon: <AiFillInstagram className="text-zinc-600 text-xl" />,
    url: "https://www.instagram.com/",
    name: "Instagram",
  },
  {
    icon: <AiFillTwitterCircle className="text-zinc-600 text-xl" />,
    url: "https://twitter.com/",
    name: "Twitter",
  },
];

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
        {profile_connect_links.map((link) => (
          <div className="flex gap-2 l-1 items-center text-sm">
            {link.icon}
            <a
              href={link.url}
              target="_blank"
              className="text-zinc-700 font-medium cursor-pointer hover:underline-offset-2"
            >
              {link.name}
            </a>
          </div>
        ))}
      </ProfileCard>

      <SimilarProfiles />
    </section>
  );
};

export default ProfileAside;
