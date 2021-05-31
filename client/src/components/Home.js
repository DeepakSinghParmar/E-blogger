import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import { htmlToText } from "html-to-text";
import { homePosts } from "../store/asyncMethods/PostMethods";
import Loader from "./Loader";

const Home = () => {
  const page = 0;
  const { loading } = useSelector((state) => state.PostReducer);
  const { posts } = useSelector((state) => state.FetchPosts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(homePosts(page));
  }, [page]);

  return (
    <>
      <Helmet>
        <title>DArticles</title>
      </Helmet>
      <div>
        <div className="row mt-100" style={{ marginBottom: "30px" }}>
          <div className="col-9 ">
            {!loading ? (
              posts.length > 0 ? (
                posts.map((post) => (
                  <div
                    className="row post-style"
                    style={{
                      margin: 10,
                      borderBottom: "1px solid black",
                    }}
                    key={post._id}
                  >
                    <div className="col-8">
                      <div className="post">
                        <div className="post__header">
                          <Link to={`/details/${post.slug}`}>
                            <div
                              className="post__header__avator"
                              style={{ background: "#04358e" }}
                            >
                              {post.userName[0]}
                            </div>
                          </Link>
                          <Link to={`/details/${post.slug}`}>
                            <div className="post__header__user">
                              <span>{post.userName}</span>
                              <span>
                                {moment(post.updatedAt).format("MMM Do YY")}
                              </span>
                            </div>
                          </Link>
                        </div>
                        <div className="post__body">
                          <h1 className="post__body__title">
                            <Link to={`/details/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h1>
                          <Link to={`/details/${post.slug}`}>
                            <div className="post__body__details">
                              {htmlToText(post.body.slice(0, 300))}
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                "No posts"
              )
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
