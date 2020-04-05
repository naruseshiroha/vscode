import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Search extends Component {

  static propType = {
    setSearchName: PropTypes.func.isRequired,
  };

  handleClick = () => {
    const searchName = this.input.value.trim();
    if (searchName) {
      this.props.setSearchName(searchName);
    }
  };

  render() {
    return (
        <div>
          <section className="jumbotron">
            <h3 className="jumbotron-heading">Search Github Users</h3>
            <div>
              <input type="text" placeholder="enter the name you search"
                     ref={input => this.input = input}/>
              <button onClick={this.handleClick}>Search</button>
            </div>
          </section>
        </div>
    );
  }
}

export default Search;