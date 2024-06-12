import { useEffect, useState } from "react";
import {
  IoCaretBack,
  IoCaretForward,
  IoHeartOutline,
  IoHeart,
} from "react-icons/io5";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";

import * as chapterServices from "../../services/chapter.services.js";
import * as novelServices from "../../services/novel.services.js";
import * as userServices from "../../services/user.service.js";
import { serverSelector } from "../../store/server.slice.js";
import userSlice, { userSelector } from "../../store/user.slice.js";

import "./index.css";

function DetailPage() {
  const { novelId } = useParams();

  const [novel, setNovel] = useState("");
  const [genres, setGenres] = useState([]);
  const [sources, setSources] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [novelSummary, setNovelSummary] = useState([]);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 30;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = chapters.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(chapters.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % chapters.length;
    setItemOffset(newOffset);
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector(userSelector);

  const server = useSelector(serverSelector);

  useEffect(() => {
    novelServices.getNovel(server, novelId).then((res) => {
      if (res && !res.error) setNovel(res.data ? res.data : []);
    });
    novelServices.getNovelGenres(server, novelId).then((res) => {
      if (res && !res.error) setGenres(res.data ? res.data : []);
    });
    novelServices.getNovelSources(server, novelId).then((res) => {
      if (res && !res.error) setSources(res.data ? res.data : []);
    });
    chapterServices.getChaptersList(server, novelId).then((res) => {
      if (res && !res.error) setChapters(res.data ? res.data : []);
    });
  }, [novelId, server]);

  useEffect(() => {
    if (novel) {
      const splitArray = novel.summary.split("\n");
      setNovelSummary(splitArray);
    }
  }, [novel]);

  const handleOnClickLike = () => {
    if (!user.isLogin) navigate("/signin");
    else {
      if (user.favoriteList.includes(Number(novelId)))
        userServices
          .deleteFavoriteNovelSV(server, user.id, novelId)
          .then((res) => {
            if (res && !res.error)
              dispatch(userSlice.actions.deleteFavoriteNovel(Number(novelId)));
          });
      else
        userServices.addFavoriteNovel(server, user.id, novelId).then((res) => {
          if (res && !res.error)
            dispatch(userSlice.actions.addFavoriteNovel(Number(novelId)));
        });
    }
  };

  return (
    <div className="detail-page-container">
      <div className="detail-page-content">
        <div className="detail-page-header">
          <span>THÔNG TIN TRUYỆN</span>
          <span></span>
        </div>
        <div className="info-content">
          <div className="left-content">
            <div className="novel-image">
              <img
                src={novel.url_pic}
                alt={novel.name}
                className="novel-image"
              />
            </div>
            <div className="novel-action">
              <button onClick={handleOnClickLike}>
                {user.favoriteList.includes(Number(novelId)) ? (
                  <IoHeart />
                ) : (
                  <IoHeartOutline />
                )}
              </button>
            </div>
          </div>
          <div className="right-content">
            <div className="novel-name">
              <span>{novel.name}</span>
            </div>
            <div className="novel-info">
              {novelSummary.length > 0 &&
                novelSummary.map((item, index) => (
                  <p style={{ marginBottom: 12 }} key={index}>
                    {item}
                  </p>
                ))}
            </div>
            <hr />
            <div className="novel-info">
              <p className="info-line">
                <strong>Tác giả:</strong> {novel.author}
              </p>
              <p className="info-line">
                <strong>Thể loại: </strong>
                {genres.length > 0 &&
                  genres.map((item, index) => (
                    <span key={index}>
                      {index !== genres.length - 1
                        ? item.genre + ", "
                        : item.genre}
                    </span>
                  ))}
              </p>
              <p className="info-line">
                <strong>Nguồn: </strong>
                {sources.length > 0 &&
                  sources.map((item, index) => (
                    <span key={index}>
                      {index !== sources.length - 1
                        ? item.get_from + ", "
                        : item.get_from}
                    </span>
                  ))}{" "}
              </p>
              <p className="info-line">
                <strong>Lượt xem:</strong> {novel.view}
              </p>
            </div>
          </div>
        </div>
        <div className="chapter-content">
          <div className="chapter-content-header">
            <span>DANH SÁCH CHƯƠNG</span>
            <span></span>
          </div>
          <div className="chapter-items">
            {currentItems.length > 0 &&
              currentItems.map((chapter) => (
                <Link
                  key={chapter.id}
                  className="chapter-item"
                  to={`/novel/${chapter.novel_id}/chapter/${chapter.chapter_number}`}
                >
                  {`Chương ${chapter.chapter_number}${
                    chapter.chapter_name && ":"
                  } ${chapter.chapter_name}`}
                </Link>
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
