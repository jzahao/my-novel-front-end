import ReadingFrame from "../../components/reading-frame";

function HomePage() {
  return (
    <div className="home-page-container common-container">
      <div className="home-page-content">
        <div
          className="draft-content"
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{ width: "200px", height: "240px", backgroundColor: "#ccc" }}
          ></div>
          <div
            style={{ width: "200px", height: "240px", backgroundColor: "#ccc" }}
          ></div>
          <div
            style={{ width: "200px", height: "240px", backgroundColor: "#ccc" }}
          ></div>
          <div
            style={{ width: "200px", height: "240px", backgroundColor: "#ccc" }}
          ></div>
          <div
            style={{ width: "200px", height: "240px", backgroundColor: "#ccc" }}
          ></div>
          <div
            style={{ width: "200px", height: "240px", backgroundColor: "#ccc" }}
          ></div>
          <div
            style={{ width: "200px", height: "240px", backgroundColor: "#ccc" }}
          ></div>
          <div
            style={{ width: "200px", height: "240px", backgroundColor: "#ccc" }}
          ></div>
          <div
            style={{ width: "200px", height: "240px", backgroundColor: "#ccc" }}
          ></div>
          <div
            style={{ width: "200px", height: "240px", backgroundColor: "#ccc" }}
          ></div>
          <div
            style={{ width: "200px", height: "240px", backgroundColor: "#ccc" }}
          ></div>
        </div>
        <ReadingFrame />
      </div>
    </div>
  );
}

export default HomePage;
