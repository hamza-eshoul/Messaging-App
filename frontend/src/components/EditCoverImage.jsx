import React, { useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { MoonLoader } from "react-spinners";
import { useAuthContext } from "../hooks/useAuthContext";
import { AiOutlinePlus } from "react-icons/ai";

const EditCoverImage = ({ setEditCoverImage, setUserProfile }) => {
  const [previewSource, setPreviewSource] = useState("");
  const [isImageUploading, setImageUploading] = useState(false);

  const { user, dispatch } = useAuthContext();

  useEffect(() => {
    if (user.coverImg) {
      setPreviewSource(user.coverImg.url);
    }
  }, [user]);

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
    setImageUploading(true);

    const user_id = user._id;
    const response = await fetch(
      "http://localhost:4000/user/update_cover_image",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, imageUrl }),
      }
    );

    const json = await response.json();

    if (response.ok) {
      setImageUploading(null);
      setUserProfile(json);
      dispatch({ type: "update_user", payload: json });
      setEditCoverImage(null);
    }
  };

  return (
    <div className="flex flex-col w-[500px] rounded-lg absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-20 bg-white shadow-lg p-4 gap-4">
      {/* Header */}
      <header className="flex border-b-[1px] border-zinc-200 justify-center items-center pb-3">
        <h1 className="text-2xl font-semibold mx-auto">
          {" "}
          Edit Profile Cover Image{" "}
        </h1>
        <div
          className=" p-2 flex justify-center items-center cursor-pointer"
          onClick={() => {
            setEditCoverImage(false);
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
              alt="Cover Preview"
              className="h-[260px] w-[260px] rounded object-fit "
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
          {isImageUploading ? (
            <MoonLoader
              color={"white"}
              loading={isImageUploading}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <span> Save Changes </span>
          )}
        </button>{" "}
      </footer>
    </div>
  );
};

export default EditCoverImage;
