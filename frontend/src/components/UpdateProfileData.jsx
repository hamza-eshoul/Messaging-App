import { useEffect, useState } from "react";
import { useUpdateUser } from "../hooks/useUpdateUser";

// icons
import { RxCross1 } from "react-icons/rx";
import { MdMode } from "react-icons/md";

// components
import Loading from "./Loading";
import Error from "./Error";

const UpdateProfileData = ({
  userProfile,
  setUserProfile,
  setIsUpdateProfileData,
}) => {
  const [isUpdatePersonalData, setIsUpdatePersonalData] = useState(false);
  const [isUpdateIntroData, setIsUpdateIntroData] = useState(false);
  // profile data state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");
  const [employer, setEmployer] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState(["", "", ""]);

  const { updateUser, isPending, error } = useUpdateUser(
    "https://odin-messaging-app-api.onrender.com/user/user_data"
  );

  useEffect(() => {
    const initializeUserData = () => {
      setFirstName(userProfile.firstName);
      setLastName(userProfile.lastName);
      setEmail(userProfile.email);

      if (userProfile.profession) {
        setProfession(userProfile.profession);
      }

      if (userProfile.employer) {
        setEmployer(userProfile.employer);
      }

      if (userProfile.location) {
        setLocation(userProfile.location);
      }

      if (userProfile.skills.length !== 0) {
        setSkills(userProfile.skills);
      }
    };

    initializeUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = userProfile._id;

    const updated_user = await updateUser({
      user_id,
      firstName,
      lastName,
      email,
      profession,
      employer,
      location,
      skills,
    });

    if (!error) {
      setUserProfile(updated_user);
      setIsUpdateProfileData(false);
    }
  };

  return (
    <form
      className="absolute left-1/2 top-1/2 z-20 flex max-h-[700px] w-[80%] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-auto  rounded-lg bg-white p-2 shadow-lg sm:w-[480px] sm:p-4"
      onSubmit={handleSubmit}
    >
      <header className="flex items-center justify-center border-b-[1px] border-zinc-200 pb-3">
        <h3 className="mx-auto text-xl font-semibold sm:text-2xl">
          Edit Profile{" "}
        </h3>
        <div
          className="flex cursor-pointer items-center justify-center rounded-full bg-zinc-100 p-2 hover:bg-zinc-200"
          onClick={() => {
            setIsUpdateProfileData(false);
          }}
        >
          <RxCross1 className="text-zinc-600 sm:text-xl" />
        </div>
      </header>
      {/* Edit Personal Data */}
      <section className="flex flex-col gap-2 px-2  pb-3">
        <div className="flex w-full items-center justify-between border-b-[1px] border-zinc-200 ">
          {" "}
          <h4 className="text-xl font-semibold text-primaryOrange sm:text-2xl ">
            {" "}
            Personal Information{" "}
          </h4>
          <MdMode
            className="cursor-pointer hover:text-primaryOrange sm:text-xl "
            onClick={() => {
              setIsUpdatePersonalData(!isUpdatePersonalData);
            }}
          />
        </div>

        {isUpdatePersonalData && (
          <div className="flex w-full flex-col gap-3 text-sm sm:text-base">
            <label className="form_label">
              <span className="text-slate-800"> First name </span>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-4 rounded border-[0.5px] border-slate-300 px-2 py-4 outline-[1px] outline-secondaryOrange sm:px-3 sm:py-5"
              />
            </label>

            <label className="form_label">
              <span className="text-slate-800">Last name</span>
              <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className="h-4 rounded border-[0.5px] border-slate-300 px-2 py-4 outline-[1px] outline-secondaryOrange sm:px-3 sm:py-5"
              />
            </label>

            <label className="form_label">
              <span className="text-slate-800 ">Email address</span>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="h-4 rounded border-[0.5px] border-slate-300 px-2 py-4 outline-[1px] outline-secondaryOrange sm:px-3 sm:py-5"
              />
            </label>
          </div>
        )}

        {!isUpdatePersonalData && (
          <ul className="flex flex-col gap-3 text-sm sm:text-base">
            <li className="font-medium">
              {firstName} {lastName}
            </li>
            <li className="font-medium"> {email}</li>
          </ul>
        )}
      </section>

      {/* Customize Your Intro */}
      <section className="flex flex-col gap-2 px-2  pb-3">
        <div className="flex w-full items-center justify-between border-b-[1px] border-zinc-200 ">
          {" "}
          <h4 className="text-xl font-semibold text-primaryOrange sm:text-2xl ">
            {" "}
            Customize Your Intro{" "}
          </h4>
          <MdMode
            className="cursor-pointer hover:text-primaryOrange sm:text-xl"
            onClick={() => {
              setIsUpdateIntroData(!isUpdateIntroData);
            }}
          />
        </div>

        {isUpdateIntroData && (
          <div className="flex w-full flex-col gap-3 text-sm sm:text-base">
            <label className="form_label">
              <span className="text-slate-800 ">Profession</span>
              <input
                type="text"
                onChange={(e) => setProfession(e.target.value)}
                value={profession}
                className="h-4 rounded border-[0.5px] border-slate-300 px-2 py-4 outline-[1px] outline-secondaryOrange sm:px-3 sm:py-5"
              />
            </label>

            <label className="form_label">
              <span className="text-slate-800 ">Employer</span>
              <input
                type="text"
                onChange={(e) => setEmployer(e.target.value)}
                value={employer}
                className="h-4 rounded border-[0.5px] border-slate-300 px-2 py-4 outline-[1px] outline-secondaryOrange sm:px-3 sm:py-5"
              />
            </label>

            <label className="form_label">
              <span className="text-slate-800">Location</span>
              <input
                type="text"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                className="h-4 rounded border-[0.5px] border-slate-300 px-2 py-4 outline-[1px] outline-secondaryOrange sm:px-3 sm:py-5"
              />
            </label>

            <label className="form_label space-y-1">
              <span className="text-slate-800">Main Skills</span>
              <input
                type="text"
                onChange={(e) =>
                  setSkills((prevSkills) => {
                    return prevSkills.map((skill, index) => {
                      if (index === 0) {
                        skill = e.target.value;
                        return skill;
                      } else {
                        return skill;
                      }
                    });
                  })
                }
                value={skills[0]}
                className="h-4 rounded border-[0.5px] border-slate-300 px-2 py-4 outline-[1px] outline-secondaryOrange sm:px-3 sm:py-5"
              />
              <input
                type="text"
                onChange={(e) =>
                  setSkills((prevSkills) => {
                    return prevSkills.map((skill, index) => {
                      if (index === 1) {
                        skill = e.target.value;
                        return skill;
                      } else {
                        return skill;
                      }
                    });
                  })
                }
                value={skills[1]}
                className="h-4 rounded border-[0.5px] border-slate-300 px-2 py-4 outline-[1px] outline-secondaryOrange sm:px-3 sm:py-5"
              />
              <input
                type="text"
                onChange={(e) =>
                  setSkills((prevSkills) => {
                    return prevSkills.map((skill, index) => {
                      if (index === 2) {
                        skill = e.target.value;
                        return skill;
                      } else {
                        return skill;
                      }
                    });
                  })
                }
                value={skills[2]}
                className="h-4 rounded border-[0.5px] border-slate-300 px-2 py-4 outline-[1px] outline-secondaryOrange sm:px-3 sm:py-5"
              />
            </label>
          </div>
        )}

        {!isUpdateIntroData && (
          <ul className="flex flex-col gap-3 text-sm sm:text-base">
            <li className="font-medium">{profession}</li>
            <li className="font-medium">{employer}</li>
            <li className="font-medium">{location}</li>
            <ol className="list-decimal space-y-1 px-4 font-medium">
              {skills.map((skill) => (
                <> {skill == "" ? "" : <li>{skill}</li>} </>
              ))}
            </ol>
          </ul>
        )}
      </section>
      {/* Post Button */}
      {isPending && <Loading loadingColor={"#fa4d12"} loadingSize={45} />}
      {error && <Error error={error} />}
      {!isPending && !error && (
        <footer className="flex items-center justify-center">
          <button className="flex items-center justify-center rounded bg-primaryOrange px-1.5 py-2 text-sm font-semibold text-white sm:px-4 sm:text-base">
            {" "}
            Save Changes
          </button>
        </footer>
      )}
    </form>
  );
};

export default UpdateProfileData;
