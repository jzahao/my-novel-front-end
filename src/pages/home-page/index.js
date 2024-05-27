import { novelList } from "../../draft";
import ListNovel from "../../components/list-novel";

import "./index.css";

function HomePage() {
  return (
    <div className="home-page-container">
      <div className="home-page-content">
        <div className="section-one">
          <ListNovel novelList={novelList} itemsPerPage={12} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
