import { useEffect, useState } from "react";
import { useFetchUsers } from "../../hooks/useFetchUsers";

// icons
import { RiMenuFoldFill } from "react-icons/ri";

// components
import MessageCardPreview from "./MessageCardPreview";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const UserMessagesList = ({
  selectedUserConversation,
  setSelectedUserConversation,
  usersList,
  setUsersList,
  triggerFetchConversation,
}) => {
  const [conversations, setConversations] = useState();
  const { users, isPending, error } = useFetchUsers();

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
    if (users) {
      setUsersList(users);
    }
  }, [users]);

  return (
    <section className="border-r-[1px] border-zinc-300 w-[25%] h-full">
      {/* Header */}
      <div className="flex gap-2 items-center  border-b-[1px] border-zinc-300 pl-4 h-[8%]">
        <RiMenuFoldFill className="text-2xl" />
        <h1 className="font-medium text-lg pb-1">User Messages</h1>
      </div>

      {/* User Messages */}
      <div className="flex flex-col h-[92%] overflow-y-auto">
        {isPending && (
          <Loading
            loadingColor={"#fa4d12"}
            size={50}
            loadingHeight={"h-screen"}
          />
        )}
        {error && (
          <Error
            error={error}
            errorColor={"text-primaryOrange"}
            errorSize={"text-lg"}
          />
        )}
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
      </div>
    </section>
  );
};

export default UserMessagesList;
