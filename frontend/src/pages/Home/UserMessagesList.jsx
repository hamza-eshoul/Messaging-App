import { useFetchUsers } from "../../hooks/useFetchUsers";

// icons
import { RiMenuFoldFill } from "react-icons/ri";

// components
import MessageCardPreview from "./MessageCardPreview";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const UserMessagesList = ({
  conversations,
  selectedUserConversation,
  setSelectedUserConversation,
}) => {
  const { users, isPending, error } = useFetchUsers();

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
            errorHeight={"h-screen"}
          />
        )}
        {users &&
          conversations &&
          users.map((user) => (
            <MessageCardPreview
              key={user._id}
              user={user}
              selectedUserConversation={selectedUserConversation}
              setSelectedUserConversation={setSelectedUserConversation}
              conversations={conversations}
            />
          ))}{" "}
      </div>
    </section>
  );
};

export default UserMessagesList;
