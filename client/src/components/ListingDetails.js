import React, { Component } from 'react';
import axios from 'axios';

class ListingDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentListing: {}
    };
  }

  componentDidMount() {
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
    return (
      <div>
        <div
          id="listing-slideshow"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol class="carousel-indicators">
            <li
              data-target="#listing-slideshow"
              data-slide-to="0"
              class="active"
            />
            <li data-target="#listing-slideshow" data-slide-to="1" />
            <li data-target="#listing-slideshow" data-slide-to="2" />
          </ol>

          <div className="carousel-inner">
            <div class="item active">
              <img src={this.state.currentListing.listingPicture} alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListingDetails;
