import React, { useEffect, useState } from "react";
import { Pagination, Button } from "@nextui-org/react";

const PaginationNextUI = ({ total, setPage, page = 1 }) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(Number(total));
    console.log(totalPages);
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
