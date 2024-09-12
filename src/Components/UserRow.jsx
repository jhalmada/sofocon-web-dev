const UserRow = ({
  avatarSrc,
  fullName,
  email,
  password,
  role,
  editIconSrc,
  deleteIconSrc,
  onEditClick,
}) => {
  return (
    <tr>
      <td>
        <img src={avatarSrc} alt="Avatar icon" className="h-[30px] w-[30px]" />
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
            className="h-[20px] w-[20px] cursor-pointer"
            onClick={onEditClick}
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
