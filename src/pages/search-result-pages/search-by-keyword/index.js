import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import SearchResultPage from "..";
import * as novelServices from "../../../services/novel.services.js";
import { serverSelector } from "../../../store/server.slice.js";

function SearchByKeywordPage() {
  const { keyword } = useParams();

  const [novels, setNovels] = useState([]);

  const server = useSelector(serverSelector);

  useEffect(() => {
    novelServices.getNovelsListByKeyword(server, keyword).then((res) => {
      if (res && !res.error) setNovels(res.data ? res.data : []);
    });
  }, [keyword, server]);

  return (
    <div className="search-by-keyword-container">
      <div className="search-by-keyword-content">
        <p
          style={{
            fontSize: "20px",
            marginBottom: "16px",
            paddingLeft: "4px",
          }}
        >
          Kết quả tìm kiếm cho <b>"{keyword}"</b>
        </p>
        <SearchResultPage novelList={novels} />
      </div>
    </div>
  );
}

export default SearchByKeywordPage;
