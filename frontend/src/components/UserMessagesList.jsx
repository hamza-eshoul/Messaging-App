import React, { useEffect, useState } from "react";
import { RiMenuFoldFill } from "react-icons/ri";
import { MoonLoader } from "react-spinners";
import MessageCardPreview from "./MessageCardPreview";
import { useAuthContext } from "../hooks/useAuthContext";

const UserMessagesList = () => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [usersList, setUsersList] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      const response = await fetch("http://localhost:4000/user");

      const json = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError("User messages could not be fetched");
      }

      if (response.ok) {
        const users = json.filter((item) => item.email !== user.email);

        setLoading(false);
        setUsersList(users);
      }
    };

    if (user) {
      fetchUsers();
    }
  }, [user]);

  return (
    <section className="border-r-[1px] border-zinc-300 w-[25%]">
      {/* Header */}
      <div className="flex gap-2 items-center  border-b-[1px] border-zinc-300 py-5 pl-4">
        <RiMenuFoldFill className="text-2xl" />
        <h1 className="font-medium text-lg pb-1">User Messages</h1>
      </div>

      {/* User Messages */}
      <div className="flex flex-col h-full">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            {" "}
            <MoonLoader
              color={"#fa4d12"}
              loading={loading}
              size={40}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <>
            {error ? (
              <div className="text-primaryOrange font-semibold text-lg text-center pt-4">
                {error}
              </div>
            ) : (
              <>
                {usersList &&
                  usersList.map((user) => (
                    <MessageCardPreview
                      key={user._id}
                      firstName={user.firstName}
                      lastName={user.lastName}
                    />
                  ))}{" "}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default UserMessagesList;
