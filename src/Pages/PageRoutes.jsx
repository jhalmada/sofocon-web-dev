import { Link } from "react-router-dom";
const PageRoutes = () => {
  return (
    <div className="h-full bg-gray p-6">
      <div className="mb-4 flex items-center">
        <img
          src="/assets/icons/chevron-left.svg"
          alt="arrow left"
          className="-ml-1 h-4 w-4"
        />
        <Link to={"/home"}>
          {" "}
          <p className="text-sm font-medium leading-4">Volver</p>
        </Link>
      </div>
      <h1 className="mb-5 text-xl font-medium leading-6 text-black_m">Rutas</h1>
    </div>
  );
};

export default PageRoutes;
