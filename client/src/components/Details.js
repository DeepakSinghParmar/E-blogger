import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { htmlToText } from "html-to-text";
import Helmet from "react-helmet";
import { postDetails, postComment } from "../store/asyncMethods/PostMethods";
import Loader from "./Loader";
import Comments from "./Comments";
const Details = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const { user } = useSelector((state) => state.AuthReducer);
  const { loading, details, comments } = useSelector(
    (state) => state.PostReducer
  );
  const dispatch = useDispatch();
  const addComment = (e) => {
    e.preventDefault();
    dispatch(postComment({ id: details._id, comment, userName: user.name }));
    setComment("");
    dispatch(postDetails(id));
  };
  useEffect(() => {
    dispatch(postDetails(id));
  }, [id]);
  return (
    <div className="container">
      <div className="row mt-100" style={{ justifyContent: "center" }}>
        <div className="col-12">
          {!loading ? (
            <div className="post__details">
              <Helmet>
                <title>{details.title}</title>
              </Helmet>
              <div className="post__header">
                <div
                  className="post__header__avator"
                  style={{ background: "#04358e" }}
                >
                  {details.userName ? details.userName[0] : ""}
                </div>
                <div className="post__header__user">
                  <span>{details.userName}</span>
                  <span>{moment(details.updatedAt).format("MMM Do YY")}</span>
                </div>
              </div>
              <div className="post__body">
                <h1 className="post__body__title">{details.title}</h1>
                <div className="post__body__details">
                  {htmlToText(details.body)}
                </div>
                {!user ? (
                  <>
                    <br />
                    <br />
                    <hr />
                    <hr />
                    <br />
                    <br />
                    <Comments comments={comments} />{" "}
                  </>
                ) : null}
              </div>
              {user ? (
                <>
                  <div className="post__comment">
                    <br />
                    <br />
                    <br />
                    <br />
                    <form onSubmit={addComment}>
                      <div className="group">
                        <input
                          style={{ border: "1px solid blue", borderRadius: 50 }}
                          type="text"
                          className="group__control"
                          placeholder="Write a comment..."
                          onChange={(e) => setComment(e.target.value)}
                          value={comment}
                        />
                      </div>
                      <div className="group">
                        <input
                          style={{
                            border: "1px solid black",
                            borderRadius: 50,
                            background: "#04358e",
                          }}
                          type="submit"
                          value="Post comment"
                          className="btn btn-default"
                        />
                      </div>
                    </form>
                  </div>
                  <Comments comments={comments} />
                </>
              ) : (
                ""
              )}
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};
export default Details;
