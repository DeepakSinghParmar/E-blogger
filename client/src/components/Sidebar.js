import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.AuthReducer);
  return (
    <>
      <div className="sidebar">
        <div className="sidebar__element">
          <h3>{user.name}</h3>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="sidebar">
        <div className="sidebar__element">
          <h3>Setting</h3>
        </div>
        <div className="sidebar__element">
          <Link to="/updatePassword">Change Password</Link>
        </div>
        <div className="sidebar__element">
          <Link to="/updateName">Change Name</Link>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
