import { useState } from "react";
import "./index.css";

function ReadingFrame() {
  const [fontSize, setFontSize] = useState("font-medium");

  const [font, setFont] = useState("font-sans-serif");

  const [theme, setTheme] = useState("theme-light");

  const [lineHeight, setLineHeight] = useState("line-medium");

  return (
    <div className="reading-frame-container">
      <div className="option-bar">
        <div className="option-field">
          <label>Font size</label>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
          >
            <option value="font-small">Small</option>
            <option value="font-medium">Medium</option>
            <option value="font-large">Large</option>
          </select>
        </div>
        <div className="option-field">
          <label>Font</label>
          <select value={font} onChange={(e) => setFont(e.target.value)}>
            <option value="font-sans-serif">San-serif</option>
            <option value="font-serif">Serif</option>
          </select>
        </div>
        <div className="option-field">
          <label>Theme</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="theme-light">Light</option>
            <option value="theme-dark">Dark</option>
          </select>
        </div>
        <div className="option-field">
          <label>Line height</label>
          <select
            value={lineHeight}
            onChange={(e) => setLineHeight(e.target.value)}
          >
            <option value="line-small">Small</option>
            <option value="line-medium">Medium</option>
            <option value="line-large">Large</option>
          </select>
        </div>
      </div>
      <div
        className={`reading-frame-content ${fontSize} ${font} ${theme} ${lineHeight}`}
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit,
          suscipit. Eius reprehenderit harum excepturi vel ad soluta vero ab,
          optio deserunt suscipit, quibusdam iste fugiat eveniet. Autem,
          voluptatibus! Ab, expedita?
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
          nostrum autem quae, temporibus quas maxime nihil a placeat
          voluptatibus asperiores eligendi dolorem tempore voluptatem? Eveniet
          beatae enim consectetur officiis quaerat.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
          obcaecati minima earum enim aliquam possimus animi saepe omnis ratione
          quam cum qui error dolores ullam, impedit aliquid beatae, modi atque.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem placeat
          doloribus mollitia nobis natus animi eum commodi assumenda nisi fugit
          expedita laborum, quaerat fugiat quasi aspernatur perferendis, amet
          tenetur eligendi.
        </p>
      </div>
    </div>
  );
}

export default ReadingFrame;
