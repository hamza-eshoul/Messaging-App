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
    <aside className="flex flex-col justify-between min-h-screen w-24 bg-primaryDark">
      {toastNotification && (
        <Toast
          toastNotification={toastNotification}
          setToastNotification={setToastNotification}
          bgColor={"bg-primaryOrange"}
          textColor={"text-white"}
          elementType={"Icon"}
        />
      )}

      <main className="flex flex-col">
        {/* logo */}
        <div className="h-22 flex flex-col space-y-4 justify-center items-center pt-5">
          <div className="h-12 w-12">
            <img src={logo} alt="app logo" className="h-full w-full" />
          </div>
          <div className=" bg-zinc-600 h-[1px] w-[70%]" />
        </div>{" "}
        <SidebarIcons
          user={user}
          toggleToastNotification={toggleToastNotification}
        />
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
            <div
              className="h-12 w-12 cursor-pointer"
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
      </div>
    </aside>
  );
};

export default Sidebar;
