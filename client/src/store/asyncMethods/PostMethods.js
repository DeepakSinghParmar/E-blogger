import axios from "axios";
import {
  CREATE_ERRORS,
  REMOVE_ERRORS,
  SET_LOADER,
  CLOSE_LOADER,
  REDIRECT_TRUE,
  REDIRECT_FALSE,
  SET_MESSAGE,
  REMOVE_MESSAGE,
  SET_POSTS,
  SET_POST,
  POST_REQUEST,
  EDIT_ERRORS,
  SET_UPDATE_ERRORS,
  UPDATE_IMAGE_ERROR,
  SET_DETAILS,
  COMMENTS,
  CODE,
} from "../types/PostTypes";

export const createAction = (postData) => {
  return async (dispatch, getState) => {
    const {
      AuthReducer: { token },
    } = getState();
    dispatch({ type: SET_LOADER });
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const {
        data: { msg, code },
      } = await axios.post(
        "http://127.0.0.1:4000/create_post",
        postData,
        config
      );

      //localStorage.setItem("code", code);
      dispatch({ type: CODE, payload: code });

      if (code === "0") {
        dispatch({ type: CLOSE_LOADER });
        dispatch({ type: REDIRECT_FALSE });
      } else {
        dispatch({ type: REMOVE_ERRORS });
        dispatch({ type: CLOSE_LOADER });
        dispatch({ type: REDIRECT_TRUE });
        dispatch({ type: SET_MESSAGE, payload: msg });
      }
    } catch (error) {
      console.log(error.response);
      const { errors } = error.response.data;
      dispatch({ type: CLOSE_LOADER });
    }
  };
};
export const fetchPosts = (id, page) => {
  return async (dispatch, getState) => {
    const {
      AuthReducer: { token },
    } = getState();
    dispatch({ type: SET_LOADER });
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const {
        data: { response, count, perPage },
      } = await axios.get(`http://127.0.0.1:4000/posts/${id}/${page}`, config);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_POSTS, payload: { response, count, perPage } });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
    }
  };
};
export const fetchPost = (id) => {
  return async (dispatch, getState) => {
    const {
      AuthReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: SET_LOADER });
    try {
      const {
        data: { post },
      } = await axios.get(`http://127.0.0.1:4000/post/${id}`, config);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_POST, payload: post });
      dispatch({ type: POST_REQUEST });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      console.log(error.message);
    }
  };
};
export const updateAction = (editData) => {
  return async (dispatch, getState) => {
    const {
      AuthReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: SET_LOADER });
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:4000/update",
        editData,
        config
      );
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: REDIRECT_TRUE });
      dispatch({ type: SET_MESSAGE, payload: data.msg });
    } catch (error) {
      const {
        response: {
          data: { errors },
        },
      } = error;
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_UPDATE_ERRORS, payload: errors });
      console.log(error.response);
    }
  };
};

export const updateImageAction = (updateData) => {
  return async (dispatch, getState) => {
    const {
      AuthReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: SET_LOADER });
    try {
      const {
        data: { msg },
      } = await axios.post(
        "http://127.0.0.1:4000/updateImage",
        updateData,
        config
      );
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: REDIRECT_TRUE });
      dispatch({ type: SET_MESSAGE, payload: msg });
    } catch (error) {
      const {
        response: {
          data: { errors },
        },
      } = error;
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: UPDATE_IMAGE_ERROR, payload: errors });
    }
  };
};
export const homePosts = (page) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const {
        data: { response, count, perPage },
      } = await axios.get(`http://127.0.0.1:4000/home/${page}`);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_POSTS, payload: { response, count, perPage } });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      console.log(error);
    }
  };
};
export const postDetails = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const {
        data: { post, comments },
      } = await axios.get(`http://127.0.0.1:4000/explore/${id}`);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_DETAILS, payload: post });
      dispatch({ type: COMMENTS, payload: comments });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      console.log(error);
    }
  };
};
export const postComment = (commentData) => {
  return async (dispatch, getState) => {
    const {
      AuthReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: SET_LOADER });
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:4000/comment",
        commentData,
        config
      );
      dispatch({ type: CLOSE_LOADER });
      console.log(data);
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      console.log(error);
    }
  };
};
