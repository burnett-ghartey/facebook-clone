import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useState } from "react";
import SearchAccount from "./searchAccount";
import SendEmail from "./sendEmail";
import CodeVerification from "./codeVerification";
import Footer from "../../components/login/Footer";
import ChangePassword from "./changePassword";

export default function Reset() {
  const { user } = useSelector((state) => ({
    ...state,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(0);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [conf_password, setConf_password] = useState("");
  const [userInfos, setUserInfos] = useState("");

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    Cookies.set("user", "");
    navigate("/login");
  };

  

  return (
    <div className="reset">
      <div className="reset_header">
        <img src="../../../icons/facebook.svg" alt="" />{" "}
        {user ? (
          <div className="right_reset">
            <Link to="/profile">
              <img src={user.picture} alt="" />
            </Link>{" "}
            <button className="blue_btn" onClick={() => logout()}>
              Logout{" "}
            </button>{" "}
          </div>
        ) : (
          <Link to="/login" className="right_reset">
            <button className="blue_btn"> Login </button>{" "}
          </Link>
        )}{" "}
      </div>{" "}
      <div className="reset_wrap">
        {" "}
        {visible === 0 && (
          <SearchAccount
            email={email}
            setEmail={setEmail}
            error={error}
            setError={setError}
            loading={loading}
            setLoading={setLoading}
            setUserInfos={setUserInfos}
            setVisible={setVisible}
          />
        )}{" "}
        {visible === 1 && userInfos && (
          <SendEmail
            error={error}
            email={email}
            setError={setError}
            loading={loading}
            setLoading={setLoading}
            userInfos={userInfos}
            setUserInfos={setUserInfos}
            setVisible={setVisible}
          />
        )}{" "}
        {visible === 2 && (
          <CodeVerification
            user={user}
            code={code}
            setCode={setCode}
            error={error}
            setError={setError}
            userInfos={userInfos}
            setUserInfos={setUserInfos}
            setLoading={setLoading}
            setVisible={setVisible}
          />
        )}{" "}
        {visible === 3 && (
          <ChangePassword
            password={password}
            conf_password={conf_password}
            setPassword={setPassword}
            setConf_password={setConf_password}
            error={error}
            setError={setError}
            userInfos={userInfos}
            setUserInfos={setUserInfos}
            setLoading={setLoading}
            setVisible={setVisible}
          />
        )}{" "}
      </div>{" "}
      <Footer />
    </div>
  );
}
