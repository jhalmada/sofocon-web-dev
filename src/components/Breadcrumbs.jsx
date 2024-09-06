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
              className="font-medium capitalize leading-[14px] text-black underline"
            >
              {breadcrumb.name}
            </Link>
            {index < breadcrumbs.length - 1 && <span>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
