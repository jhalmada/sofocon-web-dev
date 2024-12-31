import  { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";

const PaginationNextUI = ({ total, setPage, page = 1 }) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(Number(total));
  
  }, [total]);

  return (
    <div className="flex flex-col gap-5">
      <Pagination
        total={totalPages}
        color="secondary"
        page={page + 1}
        onChange={(e) => setPage(e - 1)}
      />
    </div>
  );
};

export default PaginationNextUI;
