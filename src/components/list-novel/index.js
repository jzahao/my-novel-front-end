import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import {
  IoBookmarks,
  IoCaretBack,
  IoCaretForward,
  IoEye,
  IoPencil,
} from "react-icons/io5";

import "./index.css";

function ListNovel({ novelList, itemsPerPage, flex }) {
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
        <div
          className={`novel-list-section display-flex-${
            flex === "row" ? "row" : "column"
          }`}
        >
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="novel-item"
              onClick={() => navigate(`/novel/${item.id}`)}
            >
              <div
                className="novel-picture"
                style={{
                  background: `url(${item.url_pic}) center/cover no-repeat`,
                }}
              ></div>
              <div className="novel-name">
                <span>
                  {flex !== "row" && <IoBookmarks />} {item.name}
                </span>
                <span
                  className="novel-author"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/search/${item.author}`);
                  }}
                >
                  <IoPencil /> {item.author}
                </span>
              </div>
              <div className="novel-view">
                <IoEye style={{ fontSize: "20px", marginRight: 2 }} />
                <span>{item.view}</span>
                <span className="text-view">lượt đọc</span>
              </div>
            </div>
          ))}
        </div>
        {itemsPerPage < novelList.length && (
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
        )}
      </div>
    </div>
  );
}

export default ListNovel;
