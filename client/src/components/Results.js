import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Results extends Component {
  componentDidMount() {
    document.body.className = 'white';
  }

  renderResultCards() {
    return this.props.items.map((current, index) => {
      return (
        <Link to={`/results/details/${this.props.items[index]._id}`}>
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
          <h3 className="title title-black">Grails Near You:</h3>
          <h5>Refine search:</h5>
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
