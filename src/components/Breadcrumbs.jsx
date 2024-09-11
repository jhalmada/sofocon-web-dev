import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();

  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
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
          <li key={index} className="flex items-center gap-[6px]">
            <Link
              to={breadcrumb.path}
              className="flex items-center font-medium capitalize leading-[14px] text-black underline"
            >
              {index === 0 ? (
                <img
                  src="/assets/icons/house-door.svg"
                  alt="Home"
                  className="mr-1 h-4 w-4"
                />
              ) : null}
              {index === 0 ? "Home" : breadcrumb.name}
            </Link>
            {index < breadcrumbs.length - 1 && <span>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
