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
      {isPending && <Loading loadingColor={"#fa4d12"} loadingSize={35} />}
      {error && (
        <div className="pt-4 text-center text-lg font-semibold text-primaryDark">
          {error}
        </div>
      )}

      <ul className="space-y-3">
        {shuffledAndSlicedUsersList &&
          shuffledAndSlicedUsersList.map((user) => (
            <li>
              <Link
                to={`/profile/${user._id}`}
                key={user._id}
                className="flex cursor-pointer items-center gap-3 py-1.5"
              >
                <div className="h-12 w-12">
                  <img
                    src={
                      user.profileImg.url ? user.profileImg.url : defaultProfile
                    }
                    className="h-full w-full rounded-full"
                  />
                </div>
                {/* profile info */}
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">
                    {user.firstName} {user.lastName}
                  </span>
                  {user.profession ? (
                    <span className="text-sm text-zinc-500">
                      {user.profession}{" "}
                    </span>
                  ) : (
                    <span className="text-sm text-zinc-500">
                      {" "}
                      No profession inserted{" "}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </ProfileCard>
  );
};

export default SimilarProfiles;
