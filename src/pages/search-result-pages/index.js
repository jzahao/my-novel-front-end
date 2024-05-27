import ListNovel from "../../components/list-novel";

import { novelList } from "../../draft";

function SearchResultPage() {
  return (
    <div className="search-result-container">
      <div className="search-result-content">
        <ListNovel novelList={novelList} itemsPerPage={12} />
      </div>
    </div>
  );
}

export default SearchResultPage;
