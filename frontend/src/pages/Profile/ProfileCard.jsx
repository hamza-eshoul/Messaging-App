const ProfileCard = ({ cardTitle, children }) => {
  return (
    <article className="space-y-3 rounded-xl border-[1px] bg-white  px-4 py-5 shadow-sm">
      <h2 className="font-semibold">{cardTitle}</h2>
      {children}
    </article>
  );
};

export default ProfileCard;
