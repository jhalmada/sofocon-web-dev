import watchIcon from "../assets/icons/watch.svg";

const CompetingRow = ({
  name,
  direction,
  currentCompany,
  nextVisits,
  state,
}) => {
  return (
    <tr>
      <div className="flex">
        <img
          src={watchIcon}
          alt="watch icon"
          title="Cliente próximo a vencer"
        />
        <td className="p-2">{name}</td>
      </div>
      <td className="max-w-[15rem] p-2">{direction}</td>
      <td className="p-2">{currentCompany}</td>
      <td className="p-2">{nextVisits}</td>
      <td className="p-2 text-md font-semibold leading-[1.16rem]">{state}</td>
    </tr>
  );
};

export default CompetingRow;
