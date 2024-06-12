import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import frameSlice, {
  fontSizeSelector,
  fontSelector,
  themeSelector,
  lineHeightSelector,
} from "../../store/frame.slice";

import "./index.css";

function ReadingFrame({ content }) {
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
    <div className="reading-frame-container">
      <div className="option-bar">
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
  );
}

export default memo(ReadingFrame);
