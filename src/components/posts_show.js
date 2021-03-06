import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchPost} from '../actions';
import {deletePost} from '../actions';

class PostsShow extends Component {

  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const {id} = this.props.match.params;

    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    console.log('RENDERING');
    const {post} = this.props;

    if (!post) {
      return <div>Loading ...</div>;
    }

    return (
      <div>
      <Link to="/">Back to index</Link>
      <button
        className="btn btn-danger pull-xs-right"
        onClick={this.onDeleteClick.bind(this)}
      >
        Delete post
      </button>
      <h3>{post}</h3>
      <h6>Categories: {post.categories}</h6>
      <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps({posts}, ownProps) {
  console.log('MAP STATE TO PROPS', ownProps, posts);
  return {post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);
