const NotesRow = ({
  name,
  content,
  date,
  editIconSrc,
  deleteIconSrc,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <tr className="border-b border-gray text-center">
      <td
        className="overflow-hidden text-ellipsis whitespace-nowrap p-2"
        title={name}
      >
        {name}
      </td>
      <td
        className="max-w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap p-2"
        title={content}
      >
        {content}
      </td>
      <td className="p-2">{date}</td>
      <td className="p-2">
        <div className="flex justify-center gap-4">
          <img
            src={editIconSrc}
            alt="Edit icon"
            className="h-5 w-5 cursor-pointer"
            onClick={onEditClick}
          />
          <img
            src={deleteIconSrc}
            alt="Delete icon"
            className="h-5 w-5 cursor-pointer"
            onClick={onDeleteClick}
          />
        </div>
      </td>
    </tr>
  );
};

export default NotesRow;
