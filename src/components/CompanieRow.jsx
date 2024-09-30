import { Link } from "react-router-dom";

const CompanieRow = ({
  name,
  departament,
  direction,
  sellers,

  nextVisits,
  state,
  editIconSrc,
  deleteIconSrc,
  notesIcon,
  onEditClick,
  onDeleteClick,
}) => {
  const openNotes = () => {
    window.location.href = "/ruta-a-la-empresa-o-nota"; // Cambia esto por la URL a la que quieres redirigir
  };
  return (
    <tr>
      <td className="p-2">{name}</td>
      <td className="p-2">{departament}</td>
      <td className="p-2">{direction}</td>
      <td className="p-2">{sellers}</td>
      <td className="p-2">{nextVisits}</td>
      <td className="p-2">{state}</td>
      <td className="p-2">
        <div className="flex justify-center gap-5">
          <Link to={"notas"}>
            <img
              src={notesIcon}
              alt="notes icon"
              className="h-5 w-5 cursor-pointer"
            />
          </Link>
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

export default CompanieRow;
