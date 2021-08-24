import { API, graphqlOperation } from "aws-amplify";
import { listPostsWithFilterAndDate } from "../../graphql/queries";

import {
  CLEAR_BLOGGER,
  CURRENT_POST,
  GET_BLOGGER,
  GET_POSTS,
  LOADING_POSTS,
  PUT_BLOGGER,
} from "../types";

export const getPosts = (username) => async (dispatch) => {
  try {
    await API.graphql(
      graphqlOperation(listPostsWithFilterAndDate, {
        filter: {
          owner: {
            eq: username,
          },
        },
      })
    )
      .then((res) => {
        const posts = res.data.postByDate.items;
        dispatch({
          type: GET_POSTS,
          payload: { posts },
        });
      })
      .catch((err) => console.log(JSON.stringify(err, null, 2)));
  } catch (err) {
    console.log(err);
  }
};

export const loadingPosts = () => async (dispatch) => {
  dispatch({
    type: LOADING_POSTS,
  });
};

export const getBlogger = (profile) => async (dispatch) => {
  dispatch({
    type: GET_BLOGGER,
    payload: { profile: profile },
  });
};

export const clearBlogger = () => async (dispatch) => {
  dispatch({
    type: CLEAR_BLOGGER,
    payload: { profile: {}, current: {} },
  });
};

export const getCurrentPost = (id) => async (dispatch) => {
  dispatch({
    type: CURRENT_POST,
    payload: { current },
  });
};

// export const putBloger = (update) => async (dispatch) => {
//   console.log(update);
//   dispatch({
//     type: PUT_BLOGGER,
//     payload: { current },
//   });
// };
