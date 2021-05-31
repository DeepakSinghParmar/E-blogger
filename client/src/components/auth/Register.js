import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { postRegister } from "../../store/asyncMethods/AuthMethods";

const Register = (props) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { loading, registerErrors, user } = useSelector(
    (state) => state.AuthReducer
  );

  const dispatch = useDispatch();
  const handleInputs = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const userRegister = async (e) => {
    e.preventDefault();

    dispatch(postRegister(state));
  };

  useEffect(() => {
    if (registerErrors.length > 0) {
      registerErrors.map((error) => toast.error(error.msg));
    }
  }, [registerErrors, user]);

  return (
    <>
      <Helmet>
        <title>User Register</title>
        <meta name="description" content="User register" />
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
              <form onSubmit={userRegister}>
                <div className="group">
                  <h3 className="form-heading" style={{ fontSize: 33 }}>
                    <b>REGISTER</b>
                  </h3>
                </div>
                <div className="group">
                  <input
                    autoComplete="off"
                    style={{ border: "1px solid blue", borderRadius: 50 }}
                    type="text"
                    name="name"
                    className="group__control"
                    placeholder="Enter Name"
                    value={state.name}
                    onChange={handleInputs}
                    required
                  />
                </div>
                <br />
                <div className="group">
                  <input
                    autoComplete="off"
                    style={{ border: "1px solid blue", borderRadius: 50 }}
                    type="email"
                    name="email"
                    className="group__control"
                    placeholder="Enter Email"
                    value={state.email}
                    onChange={handleInputs}
                    required
                  />
                </div>
                <br />
                <div className="group">
                  <input
                    autoComplete="off"
                    style={{ border: "1px solid blue", borderRadius: 50 }}
                    type="password"
                    name="password"
                    className="group__control"
                    placeholder="Create Password"
                    value={state.password}
                    onChange={handleInputs}
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
                    value={loading ? "..." : "Register"}
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
export default Register;
