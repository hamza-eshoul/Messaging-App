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
    "http://localhost:4000/user/user_data"
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
      className="flex flex-col w-[500px] rounded-lg absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-20 bg-white shadow-lg p-4 gap-4"
      onSubmit={handleSubmit}
    >
      {/* Header */}
      <header className="flex border-b-[1px] border-zinc-200 justify-center items-center pb-3">
        <h1 className="text-2xl font-semibold mx-auto"> Edit Profile </h1>
        <div
          className="bg-zinc-100 hover:bg-zinc-200 rounded-full p-2 flex justify-center items-center cursor-pointer"
          onClick={() => {
            setIsUpdateProfileData(false);
          }}
        >
          <RxCross1 className="text-zinc-600 text-xl" />
        </div>
      </header>
      {/* Edit Personal Information */}
      <section className="flex flex-col gap-2 px-2  pb-3">
        <div className="flex justify-between items-center border-b-[1px] border-zinc-200 w-full ">
          {" "}
          <h1 className="text-2xl font-semibold text-primaryOrange ">
            {" "}
            Personal Information{" "}
          </h1>
          <MdMode
            className="text-xl cursor-pointer hover:text-primaryOrange "
            onClick={() => {
              setIsUpdatePersonalData(!isUpdatePersonalData);
            }}
          />
        </div>

        {isUpdatePersonalData && (
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col gap-3">
              <label className="text-lg text-slate-800 ">First name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border-[0.5px] px-3 py-5 border-slate-300 rounded h-4 outline-[1px] outline-secondaryOrange text-lg"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-lg text-slate-800 ">Last name</label>
              <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className="border-[0.5px] px-3 py-5 border-slate-300 rounded h-4 outline-[1px] outline-secondaryOrange text-lg"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-lg text-slate-800 ">Email address</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border-[0.5px] px-3 py-5 border-slate-300 rounded h-4 outline-[1px] outline-secondaryOrange text-lg"
              />
            </div>
          </div>
        )}

        {!isUpdatePersonalData && (
          <ul className="flex flex-col gap-3">
            <li className="font-medium">
              {firstName} {lastName}
            </li>
            <li className="font-medium"> {email}</li>
          </ul>
        )}
      </section>
      {/* Customize Your Intro */}
      <section className="flex flex-col gap-2 px-2  pb-3">
        <div className="flex justify-between items-center border-b-[1px] border-zinc-200 w-full ">
          {" "}
          <h1 className="text-2xl font-semibold text-primaryOrange ">
            {" "}
            Customize Your Intro{" "}
          </h1>
          <MdMode
            className="text-xl cursor-pointer hover:text-primaryOrange"
            onClick={() => {
              setIsUpdateIntroData(!isUpdateIntroData);
            }}
          />
        </div>

        {isUpdateIntroData && (
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col gap-3">
              <label className="text-lg text-slate-800 ">Profession</label>
              <input
                type="text"
                onChange={(e) => setProfession(e.target.value)}
                value={profession}
                className="border-[0.5px] px-3 py-5 border-slate-300 rounded h-4 outline-[1px] outline-secondaryOrange text-lg"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-lg text-slate-800 ">Employer</label>
              <input
                type="text"
                onChange={(e) => setEmployer(e.target.value)}
                value={employer}
                className="border-[0.5px] px-3 py-5 border-slate-300 rounded h-4 outline-[1px] outline-secondaryOrange text-lg"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-lg text-slate-800 ">Location</label>
              <input
                type="text"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                className="border-[0.5px] px-3 py-5 border-slate-300 rounded h-4 outline-[1px] outline-secondaryOrange text-lg"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-lg text-slate-800 ">Main Skills</label>
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
                className="border-[0.5px] px-3 py-5 border-slate-300 rounded h-4 outline-[1px] outline-secondaryOrange text-lg"
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
                className="border-[0.5px] px-3 py-5 border-slate-300 rounded h-4 outline-[1px] outline-secondaryOrange text-lg"
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
                className="border-[0.5px] px-3 py-5 border-slate-300 rounded h-4 outline-[1px] outline-secondaryOrange text-lg"
              />
            </div>
          </div>
        )}

        {!isUpdateIntroData && (
          <ul className="flex flex-col gap-3">
            <li className="font-medium">{profession}</li>
            <li className="font-medium">{employer}</li>
            <li className="font-medium">{location}</li>
            <ol className="font-medium list-decimal px-4 space-y-1">
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
        <div className="flex justify-center items-center">
          <button className="h-12 flex justify-center items-center bg-primaryOrange text-white font-semibold rounded-md  py-2 w-1/2">
            {" "}
            Save Changes
          </button>
        </div>
      )}
    </form>
  );
};

export default UpdateProfileData;
