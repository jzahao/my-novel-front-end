import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  IoCaretBack,
  IoCaretForward,
  IoStar,
  IoCloudDownloadOutline,
} from "react-icons/io5";
import { useReactToPrint } from "react-to-print";

import * as userServices from "../../services/user.service.js";
import * as novelServices from "../../services/novel.services.js";
import * as chapterServices from "../../services/chapter.services.js";
import { serverSelector } from "../../store/server.slice.js";
import { userSelector } from "../../store/user.slice.js";
import frameSlice, {
  fontSizeSelector,
  fontSelector,
  themeSelector,
  lineHeightSelector,
} from "../../store/frame.slice";

import "./index.css";

function ReadingPage() {
  const param = useParams();

  const navigate = useNavigate();

  const [novel, setNovel] = useState("");
  const [chapter, setChapter] = useState("");
  const [minChap, setMinChap] = useState(0);
  const [maxChap, setMaxChap] = useState(0);

  const [content, setContent] = useState([]);

  const server = useSelector(serverSelector);

  const user = useSelector(userSelector);

  useEffect(() => {
    novelServices.getNovel(server, param.id).then((res) => {
      if (res && !res.error) setNovel(res.data ? res.data : {});
    });
    chapterServices.getChapter(server, param.id, param.chapter).then((res) => {
      if (res && !res.error) setChapter(res.data ? res.data : {});
    });
    novelServices.getMinAndMaxChapter(server, param.id).then((res) => {
      if (res && !res.error) {
        setMinChap(res.data && res.data.min ? res.data.min : 0);
        setMaxChap(res.data && res.data.max ? res.data.max : 0);
      }
    });
  }, [param, server]);

  useEffect(() => {
    if (chapter.content) {
      const splitArray = chapter.content.split("\n");
      setContent(splitArray);
    }
  }, [chapter]);

  useEffect(() => {
    let timer = "";
    if (novel) {
      timer = setTimeout(
        () => novelServices.countViewNovel(server, novel.id, novel.view),
        60 * 1000
      );
    }
    return () => {
      clearTimeout(timer);
    };
  }, [novel, server]);

  useEffect(() => {
    let timer = "";
    if (user.isLogin) {
      if (novel) {
        let history = "";
        userServices
          .getReadingHistory(server, user.id, novel.id)
          .then((res) => {
            if (res && !res.error) {
              history = res.data ? res.data.chapter : "";
            }
          });
        timer = setTimeout(() => {
          if (!history)
            userServices.addReadingHistory(
              server,
              user.id,
              novel.id,
              param.chapter
            );
          else if (param.chapter > history)
            userServices.updateReadingHistory(
              server,
              user.id,
              novel.id,
              param.chapter
            );
        }, 60 * 1000);
      }
    }
    return () => {
      clearTimeout(timer);
    };
  }, [param, user, novel, server]);

  const handleOnClickPrevChapter = () => {
    if (param.chapter > minChap)
      navigate(`/novel/${param.id}/chapter/${Number(param.chapter) - 1}`);
  };

  const handleOnClickNextChapter = () => {
    if (param.chapter < maxChap)
      navigate(`/novel/${param.id}/chapter/${Number(param.chapter) + 1}`);
  };

  const pdfRef = useRef();

  const printDocument = useReactToPrint({
    content: () => pdfRef.current,
  });

  const fontSize = useSelector(fontSizeSelector);
  const font = useSelector(fontSelector);
  const theme = useSelector(themeSelector);
  const lineHeight = useSelector(lineHeightSelector);

  const dispatch = useDispatch();

  const handleChangeFrameProp = (prop, e) => {
    if (prop === 1) dispatch(frameSlice.actions.fontSizeChange(e.target.value));
    if (prop === 2) dispatch(frameSlice.actions.fontChange(e.target.value));
    if (prop === 3) dispatch(frameSlice.actions.themeChange(e.target.value));
    if (prop === 4)
      dispatch(frameSlice.actions.lineHeightChange(e.target.value));
  };

  return (
    <div className="reading-page-container">
      <div className="option-bar">
        <div className="left-content">
          <div className="option-field">
            <label>
              <b>Cỡ chữ</b>
            </label>
            <select
              value={fontSize}
              onChange={(e) => handleChangeFrameProp(1, e)}
            >
              <option value="font-small">Nhỏ</option>
              <option value="font-medium">Vừa</option>
              <option value="font-large">Lớn</option>
              <option value="font-xlarge">Siu lớn</option>
            </select>
          </div>
          <div className="option-field">
            <label>
              <b>Kiểu chữ</b>
            </label>
            <select value={font} onChange={(e) => handleChangeFrameProp(2, e)}>
              <option value="font-sans-serif">Không chân</option>
              <option value="font-serif">Có chân</option>
            </select>
          </div>
          <div className="option-field">
            <label>
              <b>Nền</b>
            </label>
            <select value={theme} onChange={(e) => handleChangeFrameProp(3, e)}>
              <option value="theme-light">Sáng</option>
              <option value="theme-dark">Tối</option>
            </select>
          </div>
          <div className="option-field">
            <label>
              <b>Dãn dòng</b>
            </label>
            <select
              value={lineHeight}
              onChange={(e) => handleChangeFrameProp(4, e)}
            >
              <option value="line-small">Nhỏ</option>
              <option value="line-medium">Vừa</option>
              <option value="line-large">Lớn</option>
            </select>
          </div>
        </div>
        <button className="btn-download-chapter" onClick={printDocument}>
          <IoCloudDownloadOutline />
        </button>
      </div>
      <div className="reading-page-content" ref={pdfRef}>
        <div className="novel-info">
          <button
            className="btn-prev"
            disabled={param.chapter <= minChap}
            onClick={handleOnClickPrevChapter}
          >
            <IoCaretBack />
          </button>
          <div>
            <header onClick={() => navigate(`/novel/${param.id}`)}>
              {novel.name}
            </header>
            <span>
              {`Chương ${chapter.chapter_number}${
                chapter.chapter_name && ":"
              } ${chapter.chapter_name}`}
            </span>
          </div>
          <button
            className="btn-next"
            disabled={param.chapter >= maxChap}
            onClick={handleOnClickNextChapter}
          >
            <IoCaretForward />
          </button>
        </div>
        <div className="star-line">
          <IoStar />
          <IoStar />
          <IoStar />
          <IoStar />
          <IoStar />
        </div>
        <div className="reading-frame-container">
          <div
            className={`reading-frame-content ${fontSize} ${font} ${theme} ${lineHeight}`}
          >
            {content &&
              content.length > 0 &&
              content.map((item, index) => (
                <div key={index}>
                  <p>{item}</p>
                  <br />
                </div>
              ))}
          </div>
        </div>
        <div className="star-line">
          <IoStar />
          <IoStar />
          <IoStar />
          <IoStar />
          <IoStar />
        </div>
      </div>
      <div className="reading-page-footer">
        <button
          disabled={param.chapter <= minChap}
          onClick={handleOnClickPrevChapter}
        >
          Chương trước
        </button>
        <button
          disabled={param.chapter >= maxChap}
          onClick={handleOnClickNextChapter}
        >
          Chương sau
        </button>
      </div>
    </div>
  );
}

export default ReadingPage;
