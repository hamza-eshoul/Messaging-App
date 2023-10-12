import { useEffect, useRef, useState } from "react";
import { useUpdateUser } from "../hooks/useUpdateUser";

// icons
import { RxCross1 } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";

// components
import Loading from "./Loading";
import Error from "./Error";

const UpdateProfileImage = ({
  userProfile,
  setUserProfile,
  setIsUpdateProfileImage,
}) => {
  const [previewSource, setPreviewSource] = useState("");
  const { updateUser, isPending, error } = useUpdateUser(
    "http://localhost:4000/user/profile_image"
  );

  useEffect(() => {
    const initializeUserData = () => {
      if (userProfile.profileImg.url) {
        setPreviewSource(userProfile.profileImg.url);
      }
    };

    initializeUserData();
  }, []);

  //   image
  const inputRef = useRef(null);

  const handleImageChange = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    previewImage(image);
  };

  const previewImage = (image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const uploadImage = async (imageUrl) => {
    const user_id = userProfile._id;

    const updated_user = await updateUser({
      user_id,
      imageUrl,
    });

    if (!error) {
      setUserProfile(updated_user);
      setIsUpdateProfileImage(false);
    }
  };

  return (
    <div className="flex flex-col w-[500px] rounded-lg absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-20 bg-white shadow-lg p-4 gap-4">
      {/* Header */}
      <header className="flex border-b-[1px] border-zinc-200 justify-center items-center pb-3">
        <h1 className="text-2xl font-semibold mx-auto">
          {" "}
          Edit Profile Picture{" "}
        </h1>
        <div
          className=" p-2 flex justify-center items-center cursor-pointer"
          onClick={() => {
            setIsUpdateProfileImage(false);
          }}
        >
          <RxCross1 className="text-zinc-600 text-xl " />
        </div>
      </header>

      {/* Picture Section */}
      <section>
        {previewSource ? (
          <div className="border-[1px] p-4 w-full h-[300px] border-dotted flex items-center justify-center bg-zinc-100/10 border-zinc-300 rounded relative">
            <img
              src={previewSource}
              alt="Profile Preview"
              className="h-[250px] w-[250px] object-fit rounded-full"
            />
            <div
              className="absolute top-2 right-2 bg-zinc-100 hover:bg-zinc-200 rounded-full p-2 flex justify-center items-center cursor-pointer"
              onClick={() => setPreviewSource("")}
            >
              <RxCross1 className="text-zinc-600 text-xl " />
            </div>
          </div>
        ) : (
          <div className="border-[1px] border-dotted flex items-center justify-center bg-zinc-100/10 border-zinc-300 rounded py-3">
            No picture added
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="flex justify-between">
        {/* Upload Photo */}
        <input
          type="file"
          name="myImage"
          accept="image/*"
          onChange={(e) => {
            handleImageChange(e);
          }}
          ref={inputRef}
          className="hidden"
        />
        <button
          className="flex gap-2 items-center px-4 py-2 bg-white border-[1px] border-primaryOrange font-semibold text-[#101828] rounded"
          onClick={() => {
            inputRef.current.click();
          }}
        >
          <AiOutlinePlus className="text-primaryOrange" />

          <span> Upload Photo </span>
        </button>

        <button
          className="flex justify-center items-center px-4 py-2 bg-primaryOrange font-semibold text-white rounded"
          onClick={() => {
            uploadImage(previewSource);
          }}
        >
          {isPending && <Loading loadingColor={"white"} loadingSize={20} />}
          {error && <Error error={error} />}
          {!isPending && !error && <span> Save Changes </span>}
        </button>
      </footer>
    </div>
  );
};

export default UpdateProfileImage;
