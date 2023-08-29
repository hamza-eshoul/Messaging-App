import { RiMenuFoldFill } from "react-icons/ri";
import { MoonLoader } from "react-spinners";
import MessageCardPreview from "./MessageCardPreview";

import { useFetchUsers } from "../hooks/useFetchUsers";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const UserMessagesList = ({
  selectedUserConversation,
  setSelectedUserConversation,
  usersList,
  setUsersList,
  triggerFetchConversation,
}) => {
  const { fetchUsers, loading, error } = useFetchUsers();
  const [conversations, setConversations] = useState();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchAllConversations = async () => {
      const response = await fetch("http://localhost:4000/conversation");

      const json = await response.json();

      if (response.ok) {
        setConversations(json);
      }
    };

    fetchAllConversations();
  }, [triggerFetchConversation]);

  useEffect(() => {
    const fetchUsersList = async () => {
      const users = await fetchUsers();
      setUsersList(users);
    };

    if (user) {
      fetchUsersList();
    }
  }, [user]);

  return (
    <section className="border-r-[1px] border-zinc-300 w-[25%] h-full">
      {/* Header */}
      <div className="flex gap-2 items-center  border-b-[1px] border-zinc-300 pl-4 h-[8%]">
        <RiMenuFoldFill className="text-2xl" />
        <h1 className="font-medium text-lg pb-1">User Messages</h1>
      </div>

      {/* User Messages */}
      <div className="flex flex-col h-[92%] overflow-y-auto">
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
                      conversations={conversations}
                      key={user._id}
                      user={user}
                      selectedUserConversation={selectedUserConversation}
                      setSelectedUserConversation={setSelectedUserConversation}
                      usersList={usersList}
                      setUsersList={setUsersList}
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
