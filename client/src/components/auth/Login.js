import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { postLogin } from "../../store/asyncMethods/AuthMethods";
const Login = () => {
  const dispatch = useDispatch();
  const { loginErrors, loading } = useSelector((state) => state.AuthReducer);
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleInputs = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const userLogin = (e) => {
    e.preventDefault();
    dispatch(postLogin(state));
  };
  useEffect(() => {
    if (loginErrors.length > 0) {
      loginErrors.map((error) => toast.error(error.msg));
    }
  }, [loginErrors]);
  return (
    <>
      <Helmet>
        <title>User Login</title>
        <meta name="description" content="User login" />
      </Helmet>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "20px",
          },
        }}
      />
      <div className="row mt-80" style={{ justifyContent: "center" }}>
        <div className="col-4">
          <div className="account">
            <div className="account__section">
              <form onSubmit={userLogin}>
                <div className="group">
                  <h3 className="form-heading" style={{ fontSize: 33 }}>
                    <b>LOGIN</b>
                  </h3>
                </div>
                <br />
                <div className="group">
                  <input
                    autoComplete="off"
                    style={{ border: "1px solid blue", borderRadius: 50 }}
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleInputs}
                    className="group__control"
                    placeholder="Enter Email"
                    required
                  />
                </div>
                <br />
                <div className="group">
                  <input
                    style={{ border: "1px solid blue", borderRadius: 50 }}
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={handleInputs}
                    className="group__control"
                    placeholder="Create Password"
                    required
                  />
                </div>
                <br />
                <br />
                <div className="group">
                  <input
                    style={{
                      border: "1px solid black",
                      borderRadius: 50,
                      background: "#04358e",
                    }}
                    type="submit"
                    className="btn btn-default btn-block"
                    value={loading ? "..." : "Login"}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
