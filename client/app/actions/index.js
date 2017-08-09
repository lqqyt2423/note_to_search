export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const CHANGE_INDEX = 'CHANGE_INDEX';
export const EDIT_POST = 'EDIT_POST';
export const LOGIN_STATUS = 'LOGIN_STATUS';
export const REQUEST_POST_BYID = 'REQUEST_POST_BYID';
export const RECEIVE_POST_BYID = 'RECEIVE_POST_BYID';


export const requestPosts = () => ({
  type: REQUEST_POSTS
});

export const receivePosts = (json) => ({
  type: RECEIVE_POSTS,
  posts: json
});

export const requestPostById = () => ({
  type: REQUEST_POST_BYID
});

export const receivePostById = (json) => ({
  type: RECEIVE_POST_BYID,
  post: json
});

export const loginStatus = (status) => ({
  type: LOGIN_STATUS,
  status
});

export const fetchPosts = (query) => dispatch => {
  dispatch(requestPosts());
  dispatch(requestPostById());
  if (query) {
    return fetch(`/api/posts?q=${encodeURIComponent(query)}`, { credentials: 'include' })
    .then(response => response.json())
    .then(json => {
      dispatch(receivePosts(json));
      dispatch(fetchPostById(json[0]._id));
    });
  }
  return fetch('/api/posts', { credentials: 'include' })
  .then(response => response.json())
  .then(json => {
    dispatch(receivePosts(json));
    dispatch(fetchPostById(json[0]._id));
  })
};

export const fetchPostById = (id) => dispatch => {
  dispatch(requestPostById());
  return fetch(`/api/posts/${id}`, { credentials: 'include' })
  .then(response => response.json())
  .then(json => {
    dispatch(receivePostById(json));
  });
};

export const changeIndex = (index, id) => dispatch => {
  dispatch(fetchPostById(id));
  dispatch({
    type: CHANGE_INDEX,
    index
  });
};

export const editPost = (id) => dispatch => {
  return fetch(`/api/posts/${id}`, { method: 'POST', credentials: 'include' })
  .then(() => dispatch({ type: EDIT_POST }));
};
