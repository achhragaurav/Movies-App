import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../components/Context";
import "./Error.css";

const Error = () => {
  const { setDisplayPagination, setDisplaySearchBar } =
    useContext(GlobalContext);
  useEffect(() => {
    setDisplayPagination(false);
    setDisplaySearchBar(false);
  });

  return (
    <div>
      <h1>Error</h1>
    </div>
  );
};

export default Error;
