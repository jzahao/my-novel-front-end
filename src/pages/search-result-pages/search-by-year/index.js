import { useParams } from "react-router-dom";

import SearchResultPage from "..";

function SearchByYearPage() {
  const { year } = useParams();

  return (
    <div className="search-by-genre-container">
      <div className="search-by-genre-content">
        <h1>
          This is search by year page, year = <b>{year}</b>
        </h1>
      </div>
    </div>
  );
}

export default SearchByYearPage;
