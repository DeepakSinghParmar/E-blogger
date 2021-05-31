import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../store/types/UserTypes";
const Navbar = () => {
  const { user } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("myToken");
    dispatch({ type: LOGOUT });
  };
  const Links = user ? (
    <div className="navbar__right">
      <li>
        <Link to="/dashboard/">
          <b style={{ color: "white", fontSize: 17 }}>Profile</b>
        </Link>
      </li>
      <li>
        <Link to="/create">
          <b style={{ color: "white", fontSize: 17 }}>Create Post</b>
        </Link>
      </li>

      <li>
        <span onClick={logout}>
          <b style={{ color: "white", fontSize: 17 }}>Logout</b>
        </span>
      </li>
    </div>
  ) : (
    <div className="navbar__right">
      <li>
        <Link to="/login">
          <Button
            style={{ boxShadow: "0px 0px 6px 0px black" }}
            variant="contained"
            color="primary"
            disableElevation
          >
            <b>Login</b>
          </Button>
        </Link>
      </li>
      <li>
        <Link to="/register">
          <Button
            style={{ boxShadow: "0px 0px 6px 0px black" }}
            variant="contained"
            color="secondary"
            disableElevation
          >
            <b>Register</b>
          </Button>
        </Link>
      </li>
    </div>
  );
  return (
    <nav
      className="navbar"
      style={{
        height: 80,
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(4,53,142,1) 29%, rgba(0,212,255,1) 100%)",
        border: 1,
        borderBottomColor: "red",
      }}
    >
      <div className="container">
        <div className="navbar__row">
          <div className="navbar__left">
            <Link to="/">
              <h1 style={{ fontSize: 30, color: "white" }}>DArticles</h1>
            </Link>
          </div>
          {Links}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
