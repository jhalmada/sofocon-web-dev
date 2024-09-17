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
        <img src={avatarSrc} alt="Avatar icon" className="h-8 w-8" />
      </td>
      <td className="p-2">{fullName}</td>
      <td className="p-2">{email}</td>
      <td className="p-2">{password}</td>
      <td className="p-2">{role}</td>
      <td className="p-2">
        <div className="flex gap-5">
          <img
            src={editIconSrc}
            alt="Edit icon"
            className="h-5 w-5 cursor-pointer"
            onClick={onEditClick}
          />
          <img src={deleteIconSrc} alt="Delete icon" className="h-5 w-5" />
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
