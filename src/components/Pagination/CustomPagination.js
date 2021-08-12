import Pagination from "@material-ui/lab/Pagination";
import { useContext } from "react";
import { GlobalContext } from "../Context";
import "./CustomPagination.css";

const CustomPagination = () => {
  const { setPage, totalPages, pageNumber } = useContext(GlobalContext);

  const handlePageChange = async (page) => {
    await setPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="pageSelect">
      <Pagination
        hideNextButton
        hidePrevButton
        className=".pagination"
        count={totalPages}
        variant="outlined"
        page={+pageNumber}
        color="primary"
        onChange={(e) => {
          console.log(e.target);
          handlePageChange(e.target.textContent);
        }}
      />
    </div>
  );
};

export default CustomPagination;
