import { memo } from "react";

import ListNovel from "../../components/list-novel";

function SearchResultPage({ novelList }) {
  return (
    <div className="search-result-container">
      <div className="search-result-content">
        <ListNovel novelList={novelList} itemsPerPage={6} flex="column" />
      </div>
    </div>
  );
}

export default memo(SearchResultPage);
