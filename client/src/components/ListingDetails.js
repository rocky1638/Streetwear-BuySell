import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

  render() {
    const { currentListing } = this.state;

    if (!currentListing.seller) {
      return <div>Loading...</div>;
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <Link to="/results">Back to results</Link>
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
                <h4>{currentListing.name}</h4>
                <h5>
                  <b>Brand:</b> {currentListing.brand}
                </h5>
                <h5>
                  <b>Price:</b> ${currentListing.price} (CAD)
                </h5>
                <h5>
                  <b>About this item:</b> {currentListing.description || 'N/A'}
                </h5>
                <h5>
                  <b>Status:</b> {currentListing.isSold ? 'Sold' : 'Available'}
                </h5>
                <a href={`mailto:${currentListing.seller[0].email}`}>
                  Contact Seller
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListingDetails;
