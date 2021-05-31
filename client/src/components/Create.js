import { useState, useEffect } from "react";
import Helmet from "react-helmet";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { createAction } from "../store/asyncMethods/PostMethods";

import Loader from "./Loader";
const Create = (props) => {
  const { code, redirect, loading } = useSelector((state) => state.PostReducer);
  console.log(loading);
  console.log(code);
  console.log(redirect);

  const dispatch = useDispatch();
  const {
    user: { _id, name },
  } = useSelector((state) => state.AuthReducer);

  const [state, setState] = useState({
    title: "",
    description: "",
  });
  const handleDescription = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const [slug, setSlug] = useState("");
  const [slugButton, setSlugButton] = useState(false);
  const slugHandle = (e) => {
    setSlugButton(true);
    setSlug(e.target.value);
  };
  const handleURL = (e) => {
    e.preventDefault();
    setSlug(slug.trim().split(" ").join("-"));
  };
  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    const createSlug = e.target.value.trim().split(" ").join("-");
    setSlug(createSlug);
  };

  const [value, setValue] = useState("");
  const createPost = (e) => {
    e.preventDefault();

    const { title, description } = state;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", value);
    formData.append("description", description);
    formData.append("slug", slug);
    formData.append("name", name);
    formData.append("id", _id);

    dispatch(createAction(formData));

    if (code) {
      toast.error("Please choose a unique slug/URL");
    }
  };

  useEffect(() => {
    if (redirect) {
      props.history.push("/dashboard");
    }
  }, [redirect]);

  return (
    <div className="create mt-100">
      <Helmet>
        <title>Create new post</title>
        <meta name="description" content="Create a new post" />
      </Helmet>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "14px",
          },
        }}
      />

      {!loading ? (
        <div className="container">
          <form onSubmit={createPost}>
            <div className="row ml-minus-15 mr-minus-15">
              <div className="col-6 p-15">
                <div className="card">
                  <h3 className="card__h3">Create a new post</h3>

                  <div className="group">
                    <label htmlFor="title">Post Title</label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={state.title}
                      onChange={handleInput}
                      className="group__control"
                      placeholder="Post title..."
                      required
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="body">Post body</label>
                    <ReactQuill
                      theme="snow"
                      id="body"
                      placeholder="Post body..."
                      value={value}
                      onChange={setValue}
                      required
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="description">Meta Description</label>
                    <textarea
                      name="description"
                      id="description"
                      cols="30"
                      rows="10"
                      defaultValue={state.description}
                      onChange={handleDescription}
                      className="group__control"
                      placeholder="meta description..."
                      maxLength="150"
                      required
                    ></textarea>
                    <p className="length">
                      {state.description ? state.description.length : 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-6 p-15">
                <div className="card">
                  <div className="group">
                    <label htmlFor="slug">Post URL</label>
                    <input
                      type="text"
                      name="slug"
                      id="slug"
                      value={slug}
                      onChange={slugHandle}
                      className="group__control"
                      placeholder="Post URL..."
                      required
                    />
                  </div>
                  <div className="group">
                    {slugButton ? (
                      <button class="btn btn-default" onClick={handleURL}>
                        Update Slug
                      </button>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="group">
                    <input
                      style={{ borderRadius: 30 }}
                      type="submit"
                      value="Create post"
                      className="btn btn-default btn-block"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
export default Create;
