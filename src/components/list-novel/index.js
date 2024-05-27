import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";

import "./index.css";

function ListNovel({ novelList, itemsPerPage }) {
  const navigate = useNavigate();

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = novelList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(novelList.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % novelList.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="list-novel-container">
      <div className="list-novel-content">
        <div className="novel-list-section">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="novel-item"
              style={{
                background: `url(${item.image}) center/cover no-repeat`,
              }}
              onClick={() => navigate(`/novel/${item.id}`)}
            >
              <div className="novel-name">{item.name}</div>
            </div>
          ))}
        </div>

        <div className="panigation-container">
          <ReactPaginate
            breakLabel="..."
            nextLabel={<IoCaretForward />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={<IoCaretBack />}
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </div>
  );
}

export default ListNovel;
