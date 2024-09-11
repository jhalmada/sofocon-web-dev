const UserRow = ({
  avatarSrc,
  fullName,
  email,
  password,
  role,
  editIconSrc,
  deleteIconSrc,
}) => {
  return (
    <tr>
      <td className="p-2">
        <img src={avatarSrc} alt="Avatar icon" className="h-[40px] w-[40px]" />
      </td>
      <td className="p-2">{fullName}</td>
      <td className="p-2">{email}</td>
      <td className="p-2">{password}</td>
      <td className="p-2">{role}</td>
      <td className="p-2">
        <div className="flex gap-[20px]">
          <img
            src={editIconSrc}
            alt="Edit icon"
            className="h-[20px] w-[20px]"
          />
          <img
            src={deleteIconSrc}
            alt="Delete icon"
            className="h-[20px] w-[20px]"
          />
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
