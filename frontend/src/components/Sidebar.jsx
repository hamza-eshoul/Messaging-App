import { useState } from "react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

// images
import logo from "../assets/images/logo.png";
import defaultProfile from "../assets/images/defaultProfile.png";

// icons
import { IoMdLogOut } from "react-icons/io";

// components
import Toast from "./Toast";
import SidebarIcons from "./SidebarIcons";

const Sidebar = () => {
  const [toastNotification, setToastNotification] = useState(null);
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();

  const toggleToastNotification = () => {
    setToastNotification(true);

    setTimeout(() => {
      setToastNotification(null);
    }, 5000);
  };

  if (!user) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 flex w-full justify-center gap-6 bg-primaryDark xsm:gap-16 xmd:min-h-screen xmd:w-24 xmd:flex-col xmd:justify-between">
      {toastNotification && (
        <Toast
          toastNotification={toastNotification}
          setToastNotification={setToastNotification}
          bgColor={"bg-primaryOrange"}
          textColor={"text-white"}
          elementType={"Icon"}
        />
      )}

      <section className="flex items-center justify-center xmd:flex-col xmd:items-stretch">
        <div className="h-22 hidden flex-col items-center justify-center space-y-4 pt-5 xmd:flex">
          <img src={logo} alt="app logo" className="h-12 w-12" />

          <div className=" h-[1px] w-[70%] bg-zinc-600" />
        </div>{" "}
        <SidebarIcons
          user={user}
          toggleToastNotification={toggleToastNotification}
        />
      </section>

      <footer className="2xsm:gap-11 flex items-center justify-center gap-6 xsm:gap-16 sm:gap-20 xmd:flex-col xmd:gap-14">
        <div className="sidebarIconsContainer">
          <IoMdLogOut className="sidebarIcon" onClick={logout} />
        </div>

        <div className="flex items-center justify-center xmd:flex-col xmd:space-y-6 xmd:pb-5 ">
          <div className=" hidden h-[1.5px] w-12 bg-zinc-600 xmd:block " />
          {user && (
            <div
              className="h-8 w-8 cursor-pointer xmd:h-12 xmd:w-12"
              onClick={() => navigate("/profile/64e5f514be01e5666f6e75de")}
            >
              <img
                src={user.profileImg.url ? user.profileImg.url : defaultProfile}
                alt="user image"
                className="h-full w-full rounded-full"
              />
            </div>
          )}
        </div>
      </footer>
    </nav>
  );
};

export default Sidebar;
