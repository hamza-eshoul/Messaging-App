import { NavLink } from "react-router-dom";

// icons
import { FiMessageSquare, FiStar } from "react-icons/fi";
import { BsCursor } from "react-icons/bs";
import { RiUser6Line } from "react-icons/ri";
import { AiOutlineFile } from "react-icons/ai";
import { PiSealWarningBold } from "react-icons/pi";
import { BiTrashAlt } from "react-icons/bi";

const SidebarIcons = ({ user, toggleToastNotification }) => {
  return (
    <>
      {user && (
        <div className="sidebarIconsContainer">
          <NavLink
            to="/homepage"
            className={({ isActive }) =>
              isActive ? "activeSidebarIcons " : "sidebarIcon"
            }
          >
            <FiMessageSquare />
          </NavLink>

          <NavLink
            to={`/profile/${user._id}`}
            className={({ isActive }) =>
              isActive ? "activeSidebarIcons " : "sidebarIcon"
            }
          >
            <RiUser6Line />
          </NavLink>
          <NavLink
            to={"/profile/64e5f514be01e5666f6e75de"}
            className={({ isActive }) =>
              isActive ? "activeSidebarIcons " : "sidebarIcon"
            }
          >
            <FiStar />
          </NavLink>

          <BsCursor onClick={toggleToastNotification} className="sidebarIcon" />

          <AiOutlineFile
            onClick={toggleToastNotification}
            className="sidebarIcon"
          />
          <PiSealWarningBold
            onClick={toggleToastNotification}
            className="sidebarIcon"
          />
          <BiTrashAlt
            onClick={toggleToastNotification}
            className="sidebarIcon"
          />
        </div>
      )}
    </>
  );
};

export default SidebarIcons;
