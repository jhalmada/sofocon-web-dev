const RouteMapDetailsRow = ({ name, zone, companies, sellers, state }) => {
  return (
    <>
      <tr>
        <td
          className="max-w-[8rem] overflow-hidden text-ellipsis whitespace-nowrap p-2"
          title={name}
        >
          {name}
        </td>
        <td
          className="max-w-[8rem] overflow-hidden text-ellipsis whitespace-nowrap p-2"
          title={zone}
        >
          {zone}
        </td>
        <td
          className="max-w-[8rem] overflow-hidden text-ellipsis whitespace-nowrap p-2"
          title={companies}
        >
          {companies}
        </td>
        <td
          className="max-w-[8rem] overflow-hidden text-ellipsis whitespace-nowrap p-2"
          title={sellers}
        >
          {sellers}
        </td>
        <td className="p-2">{state ? "Activo" : "Inactivo"}</td>
      </tr>
      <tr className="border-b border-gray">
        <td colSpan="5">
          <div className="flex h-60 items-center justify-center bg-blue_l text-lg text-white">
            mapa
          </div>
        </td>
      </tr>
    </>
  );
};

export default RouteMapDetailsRow;
