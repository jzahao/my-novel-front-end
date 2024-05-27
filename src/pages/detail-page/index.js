import { useParams, Link } from "react-router-dom";

import "./index.css";

function DetailPage() {
  const { novelId } = useParams();

  console.log(novelId);

  return (
    <div className="detail-page-container">
      <div className="detail-page-content">
        <h1>
          This is detail page with novelId = <b>{novelId}</b>
        </h1>
        <Link to={`/novel/${novelId}/chapter/${1}`}>Chương 1</Link>
      </div>
    </div>
  );
}

export default DetailPage;
