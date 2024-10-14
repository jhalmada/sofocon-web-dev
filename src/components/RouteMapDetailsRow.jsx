import { Select, SelectItem } from "@nextui-org/select";

const RouteMapDetailsRow = ({ name, zone, companies, sellers, state }) => {
  return (
    <>
      <tr>
        <td className="p-2">{name}</td>
        <td className="p-2">{zone}</td>
        <td className="p-2">{companies}</td>
        <td className="p-2">{sellers}</td>
        <td className="p-2 text-sm leading-[1.16rem]">{state}</td>
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
