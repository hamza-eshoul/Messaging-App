import React from "react";

const ProfileCard = ({ cardTitle, children }) => {
  return (
    <div className="bg-white rounded-xl border-[1px] shadow-sm  space-y-3 px-4 py-5">
      <h2 className="font-semibold">{cardTitle}</h2>
      {children}
    </div>
  );
};

export default ProfileCard;
