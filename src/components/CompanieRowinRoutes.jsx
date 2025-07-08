const translateState = (state) => {
  switch (state) {
    case "POTENTIAL":
      return "Potencial";
    case "UNSUBSCRIBED":
      return "De baja";
    case "FRECUENT":
      return "Frecuente";
    case "COMPETENCE":
      return "Competencia";
    default:
      return state;
  }
};

const CompanieRowinRoute = ({
  name,
  departament,
  neighborhood,
  direction,
  nextVisits,
  state,
}) => {
  return (
    <tr className="border-b border-gray text-center">
      <div className="flex">
        <td
          className="max-w-[9rem] overflow-hidden text-ellipsis whitespace-nowrap py-4 2xl:max-w-[10rem]"
          title={name}
        >
          {name}
        </td>
      </div>
      <td
        className="max-w-[7rem] overflow-hidden text-ellipsis whitespace-nowrap py-4 2xl:max-w-[10rem]"
        title={direction}
      >
        {direction}
      </td>
      <td
        className="overflow-hidden text-ellipsis whitespace-nowrap py-4"
        title={departament}
      >
        {departament}
      </td>
      <td
        className="max-w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap py-4"
        title={neighborhood}
      >
        {neighborhood}
      </td>

      <td className="py-4">{nextVisits}</td>

      <td className="py-4 text-md font-semibold leading-[1.16rem]">
        {translateState(state)}
      </td>
    </tr>
  );
};

export default CompanieRowinRoute;
