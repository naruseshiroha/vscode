import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './commentItem.css';

class CommentItem extends Component {

  static propTypes = {
    comment: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    delComment: PropTypes.func.isRequired,
  };

  del = e => {
    const {comment, index, delComment} = this.props;
    if (window.confirm(`确认删除${comment.name}的评论?`)) {
      delComment(index);
    }
    e.preventDefault();
  };

  render() {
    const {name, content} = this.props.comment;
    return (
        <li className="list-group-item">
          <div className="handle">
            <a href="#" onClick={this.del}>删除</a>
          </div>
          <p className="user"><span>{name}</span><span>说:</span></p>
          <p className="centence">{content}</p>
        </li>
    );
  }
}

export default CommentItem;