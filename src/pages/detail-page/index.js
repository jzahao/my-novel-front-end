import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import "./index.css";

import { novelDetail } from "../../draft";

function DetailPage() {
  const { novelId } = useParams();

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10; // Số chương mỗi trang

  // Giả sử novelDetail được import từ "../../draft"
  const novel = novelDetail; 

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = novel.chapters.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(novel.chapters.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % novel.chapters.length;
    setItemOffset(newOffset);
  };

  console.log(novelId);

  return (
    <div className="container mt-5">
      <div className="header-novel-detail mb-4 p-2">
            <h3 className="Title text-start ml-0 border-bottom border-2 border-dark">THÔNG TIN TRUYỆN</h3>
      </div>
      <div className="row">
      <h3 className="name p-3 text-center">{novel.name}</h3>
        <div className="col-xs-12 col-md-4 d-flex flex-column gray-background pt-2">
          <div className="novel-details flex-grow-1 mx-auto">
            <div className="image-novel ">
              <img src={novel.image} alt={novel.name} className="novel-image" style={{ width: "200px", height: "auto" }}/>
            </div>
            <div className="inf small p-2 mt-2 border">
              <p className="novel-rating m-0"><strong>Rating:</strong> {novel.rating}</p>
              <p className="novel-author m-0"><strong>Author:</strong> {novel.author}</p>
              <p className="novel-genre m-0"><strong>Genre:</strong> {novel.genre}</p>
              <p className="novel-source m-0"><strong>Source:</strong> {novel.source}</p>
              <p className="novel-status m-0"><strong>Status:</strong> {novel.status}</p>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-md-8 d-flex flex-column border-top border-2 pt-4">
          <div className="header-novel-detail flex-grow-0">
            <h6 className="text-left">Giới Thiệu: </h6>
          </div>
          <div className="flex-grow-1 overflow-y-auto">
            <p className="novel-description overflow-y-auto small">{novel.description}</p>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          <h2 className="text-center mb-4 p-2 border-bottom border-2">Chapters</h2>
          <div className="chapter-items">
            {currentItems.map((chapter) => (
              <div key={chapter.id} className="chapter-item">
                <Link to={`/novel/${novel.id}/chapter/${chapter.id}`}>
                  {chapter.name}
                </Link>
              </div>
            ))}
          </div>
          <div className="panigation-container mt-4 d-flex justify-content-center">
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
    </div>
  );
}

export default DetailPage;
