import { Outlet } from "react-router-dom";

const LayoutPublic = () => {
  return (
    <div>
      <h1>Public Layout</h1>
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutPublic;
