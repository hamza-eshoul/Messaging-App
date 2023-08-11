import React from "react";
import logo from "../images/logo.png";
import defaultProfile from "../images/defaultProfile.png";
import { FiMessageSquare, FiStar } from "react-icons/fi";
import { BsCursor } from "react-icons/bs";
import { RiUser6Line } from "react-icons/ri";
import { AiOutlineFile } from "react-icons/ai";
import { PiSealWarningBold } from "react-icons/pi";
import { BiTrashAlt } from "react-icons/bi";
import { RiSettings2Line } from "react-icons/ri";
import { LiaHeadphonesAltSolid } from "react-icons/lia";
import { useLogout } from "../hooks/useLogout";

const Sidebar = () => {
  const { logout } = useLogout();

  return (
    <aside className="flex flex-col justify-between min-h-screen w-24 bg-primaryDark">
      {/* sidebar main part */}
      <main className="flex flex-col">
        {/* logo */}
        <div className="h-22 flex flex-col space-y-4 justify-center items-center pt-5">
          <div className="h-12 w-12">
            <img src={logo} alt="app logo" className="h-full w-full" />
          </div>
          <div className=" bg-zinc-600 h-[1px] w-[70%]" />
        </div>{" "}
        {/* icons */}
        <div className="sidebarIconsContainer">
          <FiMessageSquare />
          <FiStar />
          <BsCursor />
          <RiUser6Line />
          <AiOutlineFile />
          <PiSealWarningBold />
          <BiTrashAlt className="cursor-pointer" onClick={logout} />
        </div>
      </main>

      {/* sidebar footer */}
      <div className="flex flex-col gap-14 justify-center items-center">
        {/* footer icons */}
        <div className="sidebarIconsContainer">
          <RiSettings2Line />
          <LiaHeadphonesAltSolid />
        </div>

        {/* user image */}

        <div className="w-12 space-y-6 flex flex-col justify-center items-center pb-5 ">
          <div className=" bg-zinc-600 h-[1px] w-[80%]" />
          <img
            src={defaultProfile}
            alt="user image"
            className="h-full w-full rounded-full"
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
