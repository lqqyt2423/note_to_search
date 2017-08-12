import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { loginStatus, fetchPosts } from './actions';
import reducer from './reducers';
import App from './containers/App';
import Login from './containers/Login';
import UnLogin from './containers/UnLogin';
import './styles/index.css';

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

export const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

class Index extends React.Component {
  componentWillMount() {
    let { dispatch, history } = this.props;
    fetch('/api/login', { credentials: 'include' })
    .then(response => response.json())
    .then((json) => {
      if (json.status == 1) {
        dispatch(loginStatus('1'));
        history.push('/login');
      } else {
        dispatch(loginStatus('0'));
        dispatch(fetchPosts());
      }
    });
  }
  render() {
    let { children, status } = this.props;
    return (
      <div>
        {children}
      </div>
    )
  }
}

const IndexApp = connect(state => state.status)(Index);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={IndexApp}>
        <IndexRoute component={App} />
        <Route path="/login" component={Login} />
        <Route path="/unlogin" component={UnLogin} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
