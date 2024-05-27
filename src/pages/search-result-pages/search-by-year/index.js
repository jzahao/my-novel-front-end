import { useEffect } from "react";
import { useParams } from "react-router-dom";

import SearchResultPage from "..";

function SearchByYearPage() {
  const { year } = useParams();

  useEffect(() => {
    // call api
  }, []);

  return (
    <div className="search-by-genre-container">
      <div className="search-by-genre-content">
        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          Kết quả tìm kiếm cho năm xuất bản <b>{year}</b>
        </p>
        <SearchResultPage />
      </div>
    </div>
  );
}

export default SearchByYearPage;