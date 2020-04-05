import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './commentList.css';
import CommentItem from '../comment-item/comment-item';

class CommentList extends Component {

  static propTypes = {
    comments: PropTypes.array.isRequired,
    delComment: PropTypes.func.isRequired,
  };

  render() {
    const {comments, delComment} = this.props;
    const display = comments.length ? 'none' : 'block';
    return (
        <div className="col-md-8">
          <h3 className="reply">评论回复：</h3>
          <h2 style={{display}}>暂无评论，点击左侧添加评论！！！</h2>
          <ul className="list-group">
            {
              comments.map(
                  (c, ind) => <CommentItem key={ind} comment={c} index={ind}
                                           delComment={delComment}/>)
            }
          </ul>
        </div>
    );
  }
}

export default CommentList;