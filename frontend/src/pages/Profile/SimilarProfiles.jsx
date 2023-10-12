import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetchUsers } from "../../hooks/useFetchUsers";

// components
import Loading from "../../components/Loading";
import ProfileCard from "./ProfileCard";

// images
import defaultProfile from "../../assets/images/defaultProfile.png";

const SimilarProfiles = () => {
  const { users, isPending, error } = useFetchUsers();
  const [shuffledAndSlicedUsersList, setShuffledAndSlicedUsersList] =
    useState(null);

  const shuffleAndSliceUsersList = (users) => {
    return users.sort(() => Math.random() - 0.5).slice(0, 5);
  };

  useEffect(() => {
    if (users) {
      const transformedUsersList = shuffleAndSliceUsersList(users);
      setShuffledAndSlicedUsersList(transformedUsersList);
    }
  }, [users]);

  return (
    <ProfileCard cardTitle="Similar profiles">
      {isPending && <Loading loadingColor={"#1A1B1C"} loadingSize={30} />}
      {error && (
        <div className="text-primaryDark font-semibold text-lg text-center pt-4">
          {error}
        </div>
      )}

      {shuffledAndSlicedUsersList &&
        shuffledAndSlicedUsersList.map((user) => (
          <Link
            to={`/profile/${user._id}`}
            key={user._id}
            className="flex gap-3 items-center py-1.5 cursor-pointer"
          >
            {/* image */}
            <div className="h-12 w-12">
              <img
                src={user.profileImg.url ? user.profileImg.url : defaultProfile}
                className="h-full w-full rounded-full"
              />
            </div>
            {/* profile info */}
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold">
                {user.firstName} {user.lastName}
              </h3>
              {user.profession ? (
                <h4 className="text-sm text-zinc-500">{user.profession} </h4>
              ) : (
                <h4 className="text-sm text-zinc-500">
                  {" "}
                  No profession inserted{" "}
                </h4>
              )}
            </div>
          </Link>
        ))}
    </ProfileCard>
  );
};

export default SimilarProfiles;
