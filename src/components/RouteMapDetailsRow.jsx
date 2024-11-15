const RouteMapDetailsRow = ({ name, zone, companies, sellers, state }) => {
  return (
    <>
      <tr className="text-center">
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap py-6 text-left"
          title={name}
        >
          {name}
        </td>
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap py-6"
          title={zone}
        >
          {zone}
        </td>
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap py-6"
          title={companies}
        >
          {companies}
        </td>
        <td
          className="overflow-hidden text-ellipsis whitespace-nowrap py-6"
          title={sellers}
        >
          {sellers}
        </td>
        <td className="py-6">{state ? "Activo" : "Inactivo"}</td>
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
