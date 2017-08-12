import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { loginStatus, fetchPosts } from '../actions';

class UnLogin extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount() {
    let { history } = this.props;
    fetch('/api/login', { credentials: 'include' })
    .then(response => response.json())
    .then((json) => {
      if (json.status == 1) {
        history.push('/login');
      }
    });
  }
  handleClick() {
    let { history } = this.props;
    fetch('/api/unlogin', { credentials: 'include' })
    .then(response => response.json())
    .then(json => {
      if (json.status == 1) {
        history.push('/login');
      }
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Login out</button>
      </div>
    )
  }
}

export default connect(state => state.status)(UnLogin)
