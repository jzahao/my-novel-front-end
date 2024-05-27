import { useParams } from "react-router-dom";
import SearchResultPage from "..";

function SearchByGenrePage() {
  const { genre } = useParams();

  return (
    <div className="search-by-genre-container">
      <div className="search-by-genre-content">
        <h1>
          This is search by genre page, genre = <b>{genre}</b>
        </h1>
      </div>
    </div>
  );
}

export default SearchByGenrePage;
