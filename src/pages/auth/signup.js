import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { serverSelector } from "../../store/server.slice";
import userSlice from "../../store/user.slice.js";
import * as userServices from "../../services/user.service.js";

import "./index.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const server = useSelector(serverSelector);

  const dispatch = useDispatch();

  const handleSignup = () => {
    setErr("");
    if (!username) setErr("Tên đăng nhập không được bỏ trống");
    else if (!password) setErr("Mật khẩu không được bỏ trống");
    else if (cpassword !== password) setErr("Mật khẩu không khớp");
    else {
      userServices.register(server, username, password).then((res) => {
        if (res) {
          if (res.error) setErr(res.errMessage);
          else {
            const user_id = res.data.id;
            userServices.getFavoriteList(server, user_id).then((res) => {
              if (res) {
                dispatch(
                  userSlice.actions.login({
                    id: user_id,
                    username,
                    favoriteList: res.data
                      ? res.data.map((item) => item.id)
                      : [],
                  })
                );
                localStorage.setItem(
                  "mynovel",
                  JSON.stringify({
                    isLogin: true,
                    id: user_id,
                    username,
                  })
                );
                navigate("/");
              }
            });
          }
        }
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <h2>Đăng ký</h2>
        <hr />
        <div className="auth-form">
          <p>
            <label>Tên đăng nhập</label>
            <br />
            <input
              type="text"
              name="first_name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </p>
          <p>
            <label>Mật khẩu</label>
            <br />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </p>
          <p>
            <label>Xác nhận mật khẩu</label>
            <br />
            <input
              type="password"
              name="password"
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
          </p>
          <p style={{ color: "#ff5050", margin: "8px", fontSize: 14 }}>{err}</p>
          <p>
            <button id="sub-btn" type="button" onClick={handleSignup}>
              Đăng ký
            </button>
          </p>
        </div>
        <hr />
        <footer>
          <p>
            Đã có tài khoản? <Link to="/signin">Đăng nhập</Link>.
          </p>
          <p>
            <Link to="/">Trở về trang chủ</Link>.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default SignUp;
