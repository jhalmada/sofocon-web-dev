import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PageRedirection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, []);
  return (
    <div>
      <h2>Tienes que logearte</h2>
    </div>
  );
};

export default PageRedirection;
