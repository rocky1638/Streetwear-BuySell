import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Results extends Component {
  componentDidMount() {
    var root = document.getElementsByTagName('html')[0];
    root.className = 'scroll';
    document.body.className = 'white';
  }

  renderResultCards() {
    return this.props.items.map((current, index) => {
      return (
        <Link
          style={{ color: '#323333' }}
          to={`/results/details/${this.props.items[index]._id}`}
        >
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <div className="result-card center-block">
              <div
                id="result-card-image"
                style={{
                  backgroundImage: `url(${
                    this.props.items[index].listingPicture
                  })`
                }}
              />
              <p>{this.props.items[index].name}</p>
              <p>{this.props.items[index].brand}</p>
              <p>{this.props.items[index].price}$</p>
            </div>
          </div>
        </Link>
      );
    });
  }

  render() {
    if (!this.props.items[0]) {
      return <div>Loading...</div>;
    }

    console.log(this.props.items);

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <h3 className="title title-black">Grails Near You:</h3>
            <Link to="/">Search again</Link>
          </div>

          {this.renderResultCards()}
        </div>
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
