import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoBonfire } from "react-icons/io5";

import ListNovel from "../../components/list-novel";
import * as novelServices from "../../services/novel.services.js";
import { serverSelector } from "../../store/server.slice.js";

import "./index.css";

function HomePage() {
  const [novelsListByLatestUpdate, setNovelsListByLatestUpdate] = useState([]);
  const [novelsListByView, setNovelsListByView] = useState([]);

  const server = useSelector(serverSelector);

  useEffect(() => {
    novelServices.getNovelsListByLatestUpdate(server).then((res) => {
      if (res && !res.error)
        setNovelsListByLatestUpdate(res.data ? res.data : []);
    });
    novelServices.getNovelsListByView(server).then((res) => {
      if (res && !res.error) setNovelsListByView(res.data ? res.data : []);
    });
  }, [server]);

  return (
    <div className="home-page-container">
      <div className="home-page-content">
        <div className="section-one">
          <header>
            <IoBonfire /> Truyện nổi bật <IoBonfire />
          </header>
          <ListNovel
            novelList={novelsListByView}
            itemsPerPage={12}
            flex="row"
          />
        </div>
        <hr />
        <div className="section-two">
          <header>
            <IoBonfire /> Truyện mới cập nhật <IoBonfire />
          </header>
          <ListNovel
            novelList={novelsListByLatestUpdate}
            itemsPerPage={12}
            flex="row"
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
