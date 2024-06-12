import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoCaretBack, IoCaretForward, IoStar } from "react-icons/io5";
import { useReactToPrint } from "react-to-print";

import ReadingFrame from "../../components/reading-frame";
import * as novelServices from "../../services/novel.services.js";
import * as chapterServices from "../../services/chapter.services.js";
import { serverSelector } from "../../store/server.slice.js";

import "./index.css";
import { useSelector } from "react-redux";

function ReadingPage() {
  const param = useParams();

  const navigate = useNavigate();

  const [novel, setNovel] = useState("");
  const [chapter, setChapter] = useState("");
  const [minChap, setMinChap] = useState(0);
  const [maxChap, setMaxChap] = useState(0);

  const [content, setContent] = useState([]);

  const server = useSelector(serverSelector);

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
        () => novelServices.countViewNovel(server, param.id, novel.view),
        60 * 1000
      );
    }
    return () => {
      clearTimeout(timer);
    };
  }, [param, novel, server]);

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

  return (
    <div className="reading-page-container" ref={pdfRef}>
      <button onClick={printDocument}>download</button>
      <div className="reading-page-content">
        <div className="novel-info">
          <button className="btn-prev" onClick={handleOnClickPrevChapter}>
            <IoCaretBack />
          </button>
          <div>
            <header>{novel.name}</header>
            <span>
              Chương {chapter.chapter_number}: {chapter.chapter_name}
            </span>
          </div>
          <button className="btn-next" onClick={handleOnClickNextChapter}>
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
        <ReadingFrame content={content} />
      </div>
    </div>
  );
}

export default ReadingPage;
