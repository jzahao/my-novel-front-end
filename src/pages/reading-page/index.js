import { useParams } from "react-router-dom";
import ReadingFrame from "../../components/reading-frame";

import "./index.css";

function ReadingPage() {
  const { name, chapter } = useParams();

  console.log({ name, chapter });

  return (
    <div className="reading-page-container">
      <div className="reading-page-content">
        <ReadingFrame />
      </div>
    </div>
  );
}

export default ReadingPage;
