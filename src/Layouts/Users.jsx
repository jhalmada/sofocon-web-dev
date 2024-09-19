import { Outlet } from "react-router-dom";

const Users = () => {
  return (
    <div className="flex flex-col bg-gray">
      <div className="flex-grow p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Users;
