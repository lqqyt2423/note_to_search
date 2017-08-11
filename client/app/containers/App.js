import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts, changeIndex, editPost } from '../actions';
import marked from 'marked';
const renderer = new marked.Renderer();

renderer.heading = function (text, level) {
  return `<h${level} id="${text}" >${text}</h${level}>`;
}


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { value: '', isShowDir: true };
    this.handleChange = this.handleChange.bind(this);
    this.renderDir = this.renderDir.bind(this);
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

  renderDir(item, index) {
    let { isFetching, items, currentIndex, isFetchingPost } = this.props;
    let isEmpty = items.length === 0;
    let dirs = [];
    if (!isFetching && !isEmpty && !isFetchingPost && this.state.isShowDir) {
      let content = items[currentIndex].content;
      content.replace(/\n#{2,3}[^#].+?\n/g, match => {
        dirs.push(match);
      });
    }
    if (dirs.length) {
      return (
        <div>
          {item.filename.slice(11, -3)}
          <ul>
            {dirs.map((dir, index) => {
              let text = dir.replace(/#{2,3}/, '').trim();
              let dirType = dir.indexOf('###') > -1 ? 'third' : 'second';
              return (
                <li key={index} className={dirType} onClick={(e) => {
                    document.getElementById(e.target.innerText).scrollIntoView();
                    e.stopPropagation();
                  }}>{text}</li>
              )
            })}
          </ul>
        </div>
      )
    } else {
      return item.filename.slice(11, -3);
    }
  }

  render() {
    let { isFetching, items, currentIndex, dispatch, isFetchingPost, history } = this.props;
    let isEmpty = items.length === 0;
    return (
      <div className="markdown-body wrapper">
        <div className="sidebar">
          <input type="text" className="search" value={this.state.value} onChange={this.handleChange} />
          {
            isFetching
            ? ''
            : <ul>{items.map((item, index) => {
              if (index === currentIndex) return <li key={item._id} className="active" onClick={() => {
                  document.body.scrollIntoView();
                  this.setState(prevState => ({
                    isShowDir: !prevState.isShowDir
                  }));
                }}>{this.renderDir(item)}</li>
              return <li key={item._id} onClick={() => {
                  dispatch(changeIndex(index, item._id));
                  this.setState({ isShowDir: true });
                }}>{item.filename.slice(11, -3)}</li>
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
                  <div dangerouslySetInnerHTML={{ __html: marked(items[currentIndex].content, { renderer: renderer }) }}></div>
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
