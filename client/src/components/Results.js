import React, { Component } from 'react';
import { connect } from 'react-redux';

class Results extends Component {
  render() {
    if (!this.props.items.data) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>Results</h3>
        <p>{this.props.items.data.name}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.items
  };
}

export default connect(mapStateToProps)(Results);

