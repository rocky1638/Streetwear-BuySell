import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteListing } from '../actions';

/*
* More Pictures???
* GeoJSON proximity thing
* Contact Seller
*/

class ListingDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentListing: {}
    };
  }

  componentDidMount() {
    var root = document.getElementsByTagName('html')[0];
    root.className = 'scroll';

    axios
      .get('/api/fetch_item', {
        params: {
          id: this.props.match.params.id
        }
      })
      .then(res => {
        this.setState({
          currentListing: res.data
        });
      });
  }

  handleDeleteListing() {
    this.props.deleteListing(this.state.currentListing._id, () => {
      this.props.history.push('/profile');
    });
  }

  renderContact() {
    if (!this.props.auth) {
      <a
        className="contact-button"
        href={`mailto:${this.state.currentListing.seller[0].email}`}
      >
        Contact Seller
      </a>;
    } else if (
      this.props.auth._id === this.state.currentListing.seller[0]._id
    ) {
      return (
        <button
          className="delete-button"
          onClick={this.handleDeleteListing.bind(this)}
        >
          Delete Listing
        </button>
      );
    }
    return (
      <a
        className="contact-button"
        href={`mailto:${this.state.currentListing.seller[0].email}`}
      >
        Contact Seller
      </a>
    );
  }

  render() {
    const { currentListing } = this.state;

    if (!currentListing.seller) {
      return <div>Loading...</div>;
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-10 col-sm-offset-1">
            <div className="detail-card">
              <div className="col-xs-12 col-sm-7">
                <div
                  id="detail-image"
                  style={{
                    backgroundImage: `url(${currentListing.listingPicture})`
                  }}
                />
              </div>
              <div className="center-block">
                <h4>
                  <b>{currentListing.name}</b>
                </h4>
                <h5>
                  <b>Brand:</b> {currentListing.brand}
                </h5>
                <h5>
                  <b>Price:</b> ${currentListing.price} (CAD)
                </h5>
                <h5>
                  <b>Size: </b>
                  {currentListing.size ||
                    currentListing.shoeSize ||
                    currentListing.pantSize ||
                    'N/A'}
                </h5>
                <h5>
                  <b>About this item:</b> {currentListing.description || 'N/A'}
                </h5>
                <h5>
                  <b>Status:</b> {currentListing.isSold ? 'Sold' : 'Available'}
                </h5>
                {this.renderContact()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, { deleteListing })(ListingDetails);
