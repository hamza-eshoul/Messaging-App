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
  isConversationActive,
  setIsConversationActive,
}) => {
  const { users, isPending, error } = useFetchUsers();

  return (
    <section
      className={`w-full ${
        isConversationActive ? "hidden" : ""
      } h-[calc(100%-48px)] border-r-[1px] border-zinc-300 md:block md:w-[40%] xmd:h-full xl:w-[30%]`}
    >
      <header className="flex h-[8%] items-center gap-2  border-b-[1px] border-zinc-300 py-6 pl-4">
        <RiMenuFoldFill className="text-2xl" />
        <h1 className="pb-1 text-lg font-medium">User Messages</h1>
      </header>

      <section className="flex h-[92%] flex-col overflow-y-auto">
        {isPending && (
          <Loading
            loadingColor={"#fa4d12"}
            loadingSize={55}
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
              setIsConversationActive={setIsConversationActive}
              conversations={conversations}
            />
          ))}{" "}
      </section>
    </section>
  );
};

export default UserMessagesList;
