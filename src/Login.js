import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./userSlice";

export default function Login() {
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);
  const dispatch = useDispatch();

  const signin = () => {
    dispatch(login({ username, password }));
    setUsername("");
    setPassword("");
    if (user.username) {
      setShowLoginForm(false);
    }
  };

  const signout = () => {
    dispatch(logout());
    setShowLoginForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {user.username && (
        <p>
          hello, {user.username},{" "}
          <input type="button" onClick={signout} value="Log out" />
        </p>
      )}
      {!showLoginForm && (
        <input
          type="button"
          onClick={() => setShowLoginForm(true)}
          value="Login"
        ></input>
      )}
      {showLoginForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Username{" "}
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </label>
          </div>
          <div>
            {" "}
            <label>
              Password{" "}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </label>
          </div>
          <p>{user.isWrong ? "wrong username and/or password" : ""}</p>
          <button type="submit" onClick={signin} value="Login">
            Log in
          </button>
        </form>
      )}
    </div>
  );
}
