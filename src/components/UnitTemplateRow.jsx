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

  return (
    <tr className="border-b border-gray text-center">
      <>
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap py-6 text-left"
          title={entryDate}
        >
          {entryDate}
        </td>
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap bg-gray py-6"
          title={name}
        >
          {name}
        </td>
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap py-6"
          title={direction}
        >
          {direction}
        </td>
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap bg-gray py-6"
          title={type}
        >
          {type}
        </td>
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap py-6"
          title={color}
        >
          {color}
        </td>
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap bg-gray py-6"
          title={capacity}
        >
          {capacity}
        </td>
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap py-6"
          title={factory}
        >
          {factory}
        </td>
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap bg-gray py-6"
          title={current}
        >
          {current}
        </td>
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap py-6"
          title={registration}
        >
          {registration}
        </td>
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap bg-gray py-6"
          title={trial}
        >
          {trial}
        </td>
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap py-6"
          title={pressure}
        >
          {pressure}
        </td>
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap bg-gray py-6"
          title={exp}
        >
          {exp}
        </td>
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap py-6"
          title={discontinued}
        >
          {discontinued}
        </td>
      </>
    </tr>
  );
};

export default UnitTemplateRow;
