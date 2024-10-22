import { useNavigate } from "react-router-dom";

const UnitTemplateRow = ({
  id,
  entryDate,
  name,
  direction,
  type,
  color,
  capacity,
  factory,
  current,
  registration,
  trial,
  pressure,
  exp,
  discontinued,
}) => {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/inicio/rutas/mapa/${id}`);
  };
  return (
    <tr className="border-b border-gray text-center">
      <>
        <td
          className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap p-2 text-left"
          title={entryDate}
          onClick={handleRowClick}
        >
          {entryDate}
        </td>
        <td
          className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap bg-gray p-2"
          title={name}
          onClick={handleRowClick}
        >
          {name}
        </td>
        <td
          className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap p-2"
          title={direction}
          onClick={handleRowClick}
        >
          {direction}
        </td>
        <td
          className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap bg-gray p-2"
          title={type}
          onClick={handleRowClick}
        >
          {type}
        </td>
        <td
          className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap p-2"
          title={color}
          onClick={handleRowClick}
        >
          {color}
        </td>
        <td
          className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap bg-gray p-2"
          title={capacity}
          onClick={handleRowClick}
        >
          {capacity}
        </td>
        <td
          className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap p-2"
          title={factory}
          onClick={handleRowClick}
        >
          {factory}
        </td>
        <td
          className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap bg-gray p-2"
          title={current}
          onClick={handleRowClick}
        >
          {current}
        </td>
        <td
          className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap p-2"
          title={registration}
          onClick={handleRowClick}
        >
          {registration}
        </td>
        <td
          className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap bg-gray p-2"
          title={trial}
          onClick={handleRowClick}
        >
          {trial}
        </td>
        <td
          className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap p-2"
          title={pressure}
          onClick={handleRowClick}
        >
          {pressure}
        </td>
        <td
          className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap bg-gray p-2"
          title={exp}
          onClick={handleRowClick}
        >
          {exp}
        </td>
        <td
          className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap p-2"
          title={discontinued}
          onClick={handleRowClick}
        >
          {discontinued}
        </td>
      </>
    </tr>
  );
};

export default UnitTemplateRow;
