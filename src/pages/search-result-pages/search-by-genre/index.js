import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchResultPage from "..";

function SearchByGenrePage() {
  const { genre } = useParams();

  useEffect(() => {
    // call api
  }, []);

  return (
    <div className="search-by-genre-container">
      <div className="search-by-genre-content">
        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          Kết quả tìm kiếm cho thể loại <b>"{genre}"</b>
        </p>
        <SearchResultPage />
      </div>
    </div>
  );
}

export default SearchByGenrePage;
