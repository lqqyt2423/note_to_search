import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts, changeIndex, editPost } from '../actions';
import marked from 'marked';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let { dispatch } = this.props;
    let query = e.target.value;
    this.setState({ value: query });
    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      dispatch(fetchPosts(query));
    }, 300);
  }

  static propTypes = {
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    currentIndex: PropTypes.number.isRequired
  }

  render() {
    let { isFetching, items, currentIndex, dispatch, isFetchingPost } = this.props;
    let isEmpty = items.length === 0;
    return (
      <div className="markdown-body wrapper">
        <div className="sidebar">
          <input type="text" className="search" value={this.state.value} onChange={this.handleChange} />
          {
            isFetching
            ? ''
            : <ul>{items.map((item, index) => {
              if (index === currentIndex) return <li key={item._id} className="active">{item.filename.slice(11, -3)}</li>
              return <li key={item._id} onClick={() => dispatch(changeIndex(index, item._id))}>{item.filename.slice(11, -3)}</li>
            })}</ul>
          }
        </div>
        {
          isFetching
          ? ''
          :
          (
            isEmpty
            ? ''
            : (
              isFetchingPost
              ? ''
              : (
                <div className="content">
                  <div className="edit" onClick={() => {
                      dispatch(editPost(items[currentIndex]._id));
                    }}>编辑</div>
                  <div dangerouslySetInnerHTML={{ __html: marked(items[currentIndex].content) }}></div>
                </div>
              )
            )
          )
        }
      </div>
    )
  }
}

export default connect(state => state.posts)(App)
