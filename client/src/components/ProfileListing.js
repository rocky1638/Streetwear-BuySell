import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProfileListing extends Component {
  render() {
    return (
      <Link
        style={{ color: '#323333' }}
        to={`/results/details/${this.props.listing._id}`}
      >
        <div className="detail-card-long">
          <div className="col-xs-2">
            <div
              id="detail-image-small"
              style={{
                backgroundImage: `url(${this.props.listing.listingPicture})`
              }}
            />
          </div>
          <div className="col-xs-6">
            <h4>{this.props.listing.name}</h4>
          </div>
          <div className="col-xs-4">
            <h4>Status: {this.props.listing.isSold ? 'Sold' : 'Listed'}</h4>
          </div>
        </div>
      </Link>
    );
  }
}

export default ProfileListing;
