export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const CHANGE_INDEX = 'CHANGE_INDEX';
export const EDIT_POST = 'EDIT_POST';


export const requestPosts = () => ({
  type: REQUEST_POSTS
});

export const receivePosts = (json) => ({
  type: RECEIVE_POSTS,
  posts: json
});

export const fetchPosts = (query) => dispatch => {
  dispatch(requestPosts())
  if (query) {
    return fetch(`/api/posts?q=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(json)))
  }
  return fetch('/api/posts')
  .then(response => response.json())
  .then(json => dispatch(receivePosts(json)))
};

export const changeIndex = (index) => ({
  type: CHANGE_INDEX,
  index
});

export const editPost = (id) => dispatch => {
  return fetch(`/api/posts/${id}`, { method: 'POST' })
  .then(() => dispatch({ type: EDIT_POST }));
};