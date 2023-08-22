import { RiMenuFoldFill } from "react-icons/ri";
import { MoonLoader } from "react-spinners";
import MessageCardPreview from "./MessageCardPreview";

import { useFetchUsers } from "../hooks/useFetchUsers";

const UserMessagesList = ({
  selectedUserConversation,
  setSelectedUserConversation,
}) => {
  const { loading, error, usersList } = useFetchUsers();

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
                      user={user}
                      selectedUserConversation={selectedUserConversation}
                      setSelectedUserConversation={setSelectedUserConversation}
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
