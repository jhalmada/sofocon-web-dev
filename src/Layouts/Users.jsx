import { Outlet } from "react-router-dom";

const Users = () => {
  return (
    <div className="flex min-h-[85vh] flex-col bg-gray">
      <div className="flex-grow p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Users;
