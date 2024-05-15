import { useState } from "react";
import { IoSearch } from "react-icons/io5";

import "./index.css";

function SearchBox() {
  const [content, setContent] = useState("");

  const handleOnClickSearchBtn = () => {
    console.log(content);
  };

  return (
    <div className="search-box-container">
      <div className="search-box-content">
        <input
          type="text"
          placeholder="Tìm tiểu thuyết"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="button" onClick={handleOnClickSearchBtn}>
          <IoSearch />
        </button>
      </div>
    </div>
  );
}

export default SearchBox;
