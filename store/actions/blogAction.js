import { API, graphqlOperation } from "aws-amplify";
import { createCategory } from "../../graphql/mutations";
import { getCategory, listPostsWithFilterAndDate } from "../../graphql/queries";

import {
  CLEAR_BLOGGER,
  CLEAR_NOTIFICATION,
  GET_BLOGGER,
  GET_POSTS,
  LOADING_POSTS,
  PUT_BLOGGER,
  PUT_CATEGORY,
  PUT_NOTIFICATION,
} from "../types";

export const getPosts = (username) => async (dispatch) => {
  try {
    await API.graphql(
      graphqlOperation(listPostsWithFilterAndDate, {
        sortDirection: "DESC",
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
    console.log(err, JSON.stringify(err, null, 2));
  }
};

export const loadingPosts = () => async (dispatch) => {
  dispatch({
    type: LOADING_POSTS,
  });
};

export const getBlogger = (profile) => async (dispatch) => {
  try {
    if (profile.category) {
      await API.graphql(
        graphqlOperation(getCategory, {
          id: profile.id,
        })
      )
        .then((res) => {
          const category = res.data.getCategory.list;
          profile.category = category;
          dispatch({
            type: GET_BLOGGER,
            payload: { profile: profile },
          });
        })
        .catch((err) => {
          console.log(JSON.stringify(err, null, 2));
        });
    } else {
      await API.graphql(
        graphqlOperation(createCategory, {
          input: { id: profile.id, owner: profile.username, list: [] },
        })
      )
        .then((res) => {
          profile.category = [];
          dispatch({
            type: GET_BLOGGER,
            payload: { profile: profile },
          });
        })
        .catch(async (err) => {
          await API.graphql(
            graphqlOperation(getCategory, {
              id: profile.id,
            })
          )
            .then((res) => {
              const category = res.data.getCategory.list;
              profile.category = category;
              dispatch({
                type: GET_BLOGGER,
                payload: { profile: profile },
              });
            })
            .catch((err) => {
              console.log(JSON.stringify(err, null, 2));
            });
          // profile.category = [];
          // console.log("user with no catecory data", profile);
          // dispatch({
          //   type: GET_BLOGGER,
          //   payload: { profile: profile },
          // });
        });
    }
  } catch (err) {
    console.log(err);
  }
};

export const clearBlogger = () => async (dispatch) => {
  dispatch({
    type: CLEAR_BLOGGER,
    payload: { profile: {}, current: {} },
  });
};

export const putNotification =
  ({ type, message }) =>
  async (dispatch) => {
    const notification = { type: type, message: message };
    dispatch({
      type: PUT_NOTIFICATION,
      payload: { notification },
    });
  };

export const putCategory = (category) => async (dispatch) => {
  dispatch({
    type: PUT_CATEGORY,
    payload: { category },
  });
};

export const clearNotification = () => async (dispatch) => {
  const notification = { type: "", message: "" };
  dispatch({
    type: CLEAR_NOTIFICATION,
    payload: { notification },
  });
};

// export const putBloger = (update) => async (dispatch) => {
//   console.log(update);
//   dispatch({
//     type: PUT_BLOGGER,
//     payload: { current },
//   });
// };
