import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ListNovel from "../../components/list-novel";
import * as userServices from "../../services/user.service.js";
import { serverSelector } from "../../store/server.slice.js";
import { userSelector } from "../../store/user.slice.js";

import "./index.css";

function MyFavorite() {
  const [favoriteList, setFavoriteList] = useState([]);

  const server = useSelector(serverSelector);
  const user = useSelector(userSelector);

  useEffect(() => {
    userServices.getFavoriteList(server, user.id).then((res) => {
      if (res && !res.error) setFavoriteList(res.data ? res.data : []);
    });
  }, [server, user]);

  return (
    <div className="my-favorite-page-container">
      <div className="my-favorite-content">
        <p
          style={{
            fontSize: "20px",
            marginBottom: "16px",
            paddingLeft: "4px",
          }}
        >
          <b>Danh sách tiểu thuyết yêu thích</b>
        </p>
        <ListNovel novelList={favoriteList} itemsPerPage={10} flex="column" />
      </div>
    </div>
  );
}

export default MyFavorite;
