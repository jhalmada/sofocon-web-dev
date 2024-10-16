import HouseDoorIcon from "../assets/icons/house-door.svg";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  const generateBreadcrumbs = () => {
    const pathnames = location.pathname
      .split("/")
      .filter((x) => x && !uuidRegex.test(x) && x !== "true" && x !== "false");
    return [
      ...pathnames.map((name, index) => {
        const path = `/${pathnames.slice(0, index + 1).join("/")}`;
        return { name, path };
      }),
    ];
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className="text-gray-700">
      <ol className="list-reset flex items-center space-x-2 text-xs">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <Link
              to={breadcrumb.path}
              className="flex items-center font-medium capitalize leading-[.875rem] text-black underline"
            >
              {index === 0 ? (
                <img src={HouseDoorIcon} alt="Home" className="mr-1 h-4 w-4" />
              ) : null}
              {index === 0 ? "Inicio" : breadcrumb.name}
            </Link>
            {index < breadcrumbs.length - 1 && <span>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
