import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser, fetchUserItems } from '../actions';
import axios from 'axios';
import { Link } from 'react-router-dom';

import ProfileListing from './ProfileListing';

class Profile extends Component {
  componentDidMount() {
    axios.get('/api/current_user').then(res => this.props.fetchUser(res));

    this.props.fetchUserItems();

    document.body.className = 'white';
  }

  renderListings() {
    return <ProfileListing listing={this.props.userItems[0]} />;
  }

  render() {
    if (this.props.user === null || this.props.userItems === null) {
      return <div>ERROR: LOGIN TO CONTINUE</div>; // probably replace with error component
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-10 col-sm-offset-1 center-text">
            <h2 className="form-header">Profile Page</h2>
            <p>{this.props.user.googleId}</p>
            <p>{this.props.user.name}</p>
            <p>{this.props.user.favoriteBrand}</p>
            <h3 className="form-header">My Listings</h3>
            <div>{this.renderListings()}</div>
            <Link className="button" to="/profile/update_info">
              Update Info
            </Link>
            <Link className="button" to="/">
              Home
            </Link>
            <Link className="button" to="/profile/add_listing">
              Add Listing
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth,
    userItems: state.userItems
  };
}

export default connect(mapStateToProps, { fetchUser, fetchUserItems })(Profile);
