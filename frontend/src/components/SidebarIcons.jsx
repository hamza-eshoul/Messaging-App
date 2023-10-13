import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

// icons
import { FiMessageSquare, FiStar } from "react-icons/fi";
import { BsCursor } from "react-icons/bs";
import { RiUser6Line } from "react-icons/ri";
import { AiOutlineFile } from "react-icons/ai";
import { PiSealWarningBold } from "react-icons/pi";
import { BiTrashAlt } from "react-icons/bi";

const SidebarIcons = ({ user, toggleToastNotification }) => {
  const [isRandomUserProfile, setIsRandomUserProfile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkRandomUserAndSetFiStarActiveLink = () => {
      if (
        location.pathname.includes("profile") &&
        !location.pathname.includes(user._id)
      ) {
        setIsRandomUserProfile(true);
      } else {
        setIsRandomUserProfile(false);
      }
    };

    checkRandomUserAndSetFiStarActiveLink();
  }, [location]);

  return (
    <>
      {user && (
        <ul className="sidebarIconsContainer">
          <li className="flex w-full items-center justify-center">
            <NavLink
              to="/homepage"
              className={({ isActive }) =>
                isActive ? "activeSidebarIcons " : "sidebarIcon"
              }
            >
              <FiMessageSquare />
            </NavLink>
          </li>
          <li className="flex w-full items-center justify-center">
            <NavLink
              to={`/profile/${user._id}`}
              className={({ isActive }) =>
                isActive ? "activeSidebarIcons" : "sidebarIcon"
              }
            >
              <RiUser6Line />
            </NavLink>
          </li>

          <li
            className={`${
              isRandomUserProfile ? "activeSidebarIcons" : "sidebarIcon"
            }`}
          >
            <FiStar onClick={toggleToastNotification} />
          </li>

          <li>
            <BsCursor
              onClick={toggleToastNotification}
              className="sidebarIcon"
            />
          </li>

          <li className="hidden xmd:block">
            <AiOutlineFile
              onClick={toggleToastNotification}
              className="sidebarIcon"
            />
          </li>
          <li className="hidden xmd:block">
            <PiSealWarningBold
              onClick={toggleToastNotification}
              className="sidebarIcon"
            />
          </li>

          <li className="hidden xmd:block">
            <BiTrashAlt
              onClick={toggleToastNotification}
              className="sidebarIcon"
            />
          </li>
        </ul>
      )}
    </>
  );
};

export default SidebarIcons;
