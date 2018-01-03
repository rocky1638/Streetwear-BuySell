import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Profile extends Component {
  componentDidMount() {
    axios.get('/api/current_user').then(res => this.props.fetchUser(res));
  }

  renderListings() {
    return <div>listing</div>;
  }

  render() {
    if (this.props.user === null) {
      return <div>ERROR: LOGIN TO CONTINUE</div>; // probably replace with error component
    }

    return (
      <div>
        <h2 className="form-header">Profile Page</h2>
        <p>{this.props.user.googleId}</p>
        <p>{this.props.user.name}</p>
        <p>{this.props.user.favoriteBrand}</p>
        <div>
          <h3 className="form-header">My Listings</h3>
          {this.renderListings}
        </div>
        <Link className="button" to="/profile/update_info">
          Update Info
        </Link>
        <Link className="button" to="/">
          Home
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth
  };
}

export default connect(mapStateToProps, { fetchUser })(Profile);
