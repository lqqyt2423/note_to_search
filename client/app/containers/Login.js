import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginStatus, fetchPosts } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { user: '', password: '' };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    let { dispatch, history } = this.props;
    fetch('/api/login', { credentials: 'include' })
    .then(response => response.json())
    .then((json) => {
      if (json.status == 0) {
        history.push('/');
      }
    });
  }
  handleUserChange(e) {
    this.setState({ user: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  handleSubmit(e) {
    let { dispatch, history } = this.props;
    e.preventDefault();
    fetch(`/api/login/?user=${this.state.user}&password=${this.state.password}`, { credentials: 'include' })
    .then(response => response.json())
    .then((json) => {
      if (json.status == 1) {
        this.setState({ user:'', password: '' });
      } else {
        dispatch(loginStatus('0'));
        dispatch(fetchPosts());
        history.push('/');
      }
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p>账号：<input name="user" value={this.state.user} onChange={this.handleUserChange} type="text" /></p>
          <p>密码：<input name="password" value={this.state.password} onChange={this.handlePasswordChange} type="password" /></p>
          <p><input type="submit" /></p>
        </form>
      </div>
    )
  }
}

export default connect(state => state.status)(Login)
