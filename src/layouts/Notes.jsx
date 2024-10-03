import { Outlet } from "react-router-dom";

const Notes = () => {
  return (
    <div className="flex min-h-full flex-col bg-gray">
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default Notes;
