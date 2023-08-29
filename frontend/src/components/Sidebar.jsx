import React, { useState } from "react";
import logo from "../images/logo.png";
import defaultProfile from "../images/defaultProfile.png";

import { useLogout } from "../hooks/useLogout";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

// icons
import { FiMessageSquare, FiStar } from "react-icons/fi";
import { BsCursor } from "react-icons/bs";
import { RiUser6Line } from "react-icons/ri";
import { AiOutlineFile } from "react-icons/ai";
import { PiSealWarningBold } from "react-icons/pi";
import { BiTrashAlt } from "react-icons/bi";
import { IoMdLogOut } from "react-icons/io";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

const Sidebar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [iconNotification, setIconNotification] = useState(null);

  const showIconNotification = () => {
    setIconNotification(true);

    setTimeout(() => {
      setIconNotification(null);
    }, 5000);
  };

  return (
    <aside className="flex flex-col justify-between min-h-screen w-24 bg-primaryDark">
      {/* sidebar main part */}

      {iconNotification && (
        <div className="flex gap-4 items-center absolute right-1/3 bottom-6  bg-primaryOrange text-white p-4 rounded-lg shadow-2xl border-[1px] border-primaryGray to-zinc-100 z-10 ">
          <AiOutlineInfoCircle className="text-xl" />
          <div>
            <h2 className="font-semibold">Icon Notification</h2>
            <p>This icon is used for decoration purposes only </p>
          </div>
          <RxCross1
            className="cursor-pointer"
            onClick={() => setIconNotification(null)}
          />
        </div>
      )}

      <main className="flex flex-col">
        {/* logo */}
        <div className="h-22 flex flex-col space-y-4 justify-center items-center pt-5">
          <div className="h-12 w-12">
            <img src={logo} alt="app logo" className="h-full w-full" />
          </div>
          <div className=" bg-zinc-600 h-[1px] w-[70%]" />
        </div>{" "}
        {/* icons */}
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

            <BsCursor onClick={showIconNotification} className="sidebarIcon" />

            <AiOutlineFile
              onClick={showIconNotification}
              className="sidebarIcon"
            />
            <PiSealWarningBold
              onClick={showIconNotification}
              className="sidebarIcon"
            />
            <BiTrashAlt
              onClick={showIconNotification}
              className="sidebarIcon"
            />
          </div>
        )}
      </main>

      {/* sidebar footer */}
      <div className="flex flex-col gap-14 justify-center items-center">
        {/* footer icons */}
        <div className="sidebarIconsContainer">
          <IoMdLogOut className="sidebarIcon" onClick={logout} />
        </div>

        {/* user image */}

        <div className=" space-y-6 flex flex-col justify-center items-center pb-5 ">
          <div className=" bg-zinc-600 w-12 h-[1.5px] " />
          {user && (
            <div className="h-12 w-12">
              <img
                src={user.profileImg.url ? user.profileImg.url : defaultProfile}
                alt="user image"
                className="h-full w-full rounded-full"
              />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
