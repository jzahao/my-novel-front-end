import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import SearchResultPage from "..";
import * as novelServices from "../../../services/novel.services.js";
import * as genreServices from "../../../services/genre.services.js";
import { serverSelector } from "../../../store/server.slice.js";

import "./index.css";

function SearchByGenrePage() {
  const { genre } = useParams();

  const [novels, setNovels] = useState([]);
  const [genres, setGenres] = useState([]);

  const server = useSelector(serverSelector);

  useEffect(() => {
    novelServices.getNovelsListByGenre(server, genre).then((res) => {
      if (res && !res.error) setNovels(res.data ? res.data : []);
    });
  }, [genre, server]);

  useEffect(() => {
    genreServices.getGenres(server).then((res) => {
      if (res && !res.error) setGenres(res.data ? res.data : []);
    });
  }, [server]);

  return (
    <div className="search-by-genre-container">
      <div className="search-by-genre-content">
        <div className="left-content">
          <p
            style={{
              fontSize: "20px",
              marginBottom: "16px",
              paddingLeft: "4px",
            }}
          >
            Kết quả tìm kiếm cho thể loại <b>"{genre}"</b>
          </p>
          <SearchResultPage novelList={novels} />
        </div>
        <div className="right-content">
          <header>Thể loại truyện</header>
          <div className="genres-list">
            {genres.length > 0 &&
              genres.map((item, index) => (
                <Link key={index} to={`/genre/${item.genre}`}>
                  {item.genre}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchByGenrePage;
