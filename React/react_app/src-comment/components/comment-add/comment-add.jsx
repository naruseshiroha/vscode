import React, {Component} from 'react';

const PropTypes = require('prop-types');

class CommentAdd extends Component {

  static propTypes = {
    addComment: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    content: '',
  };

  add = () => {
    const comment = this.state;
    this.props.addComment(comment);
    this.setState({name: '', content: ''});
  };

  handleNameChange = e => {
    const name = e.target.value;
    this.setState({name});
    // this.setState({param});
  };

  handleContentChange = e => {
    const content = e.target.value;
    this.setState({content});
  };

  render() {
    const {name, content} = this.state;
    return (
        <div className="col-md-4">
          <form className="form-horizontal">
            <div className="form-group">
              <label>用户名</label>
              <input type="text" className="form-control" value={name}
                     onChange={this.handleNameChange} placeholder="用户名"/>
            </div>
            <div className="form-group">
              <label>评论内容</label>
              <textarea className="form-control" rows="6" value={content}
                        onChange={this.handleContentChange}
                        placeholder="评论内容"/>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="button"
                        className="btn btn-default pull-right"
                        onClick={this.add}>提交
                </button>
              </div>
            </div>
          </form>
        </div>
    );
  }
}

export default CommentAdd;