import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchItems, fetchUser } from '../actions';
import axios from 'axios';

class Home extends Component {
  componentDidMount() {
    document.body.className = 'home';
    axios.get('/api/current_user').then(res => {
      this.props.fetchUser(res);
    });
  }

  renderSearchField(field) {
    return (
      <div className="form-group">
        <input
          className="form-control form-control-search"
          type="text"
          // placeholder="Search for Supreme, Bape, Balenciaga..."
          {...field.input}
        />
      </div>
    );
  }

  renderButtons() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div className="col-xs-12">
            <Link to="/signup" className="button button-right">
              Sign Up
            </Link>
            <Link to="/login" className="button button-right">
              Login
            </Link>
          </div>
        );
      default:
        return (
          <div className="col-xs-12">
            <a href="/api/logout" className="button button-right">
              Logout
            </a>
            <Link to="/profile" className="button button-right">
              My Profile
            </Link>
          </div>
        );
    }
  }

  onSubmit(values) {
    this.props.fetchItems(() => {
      // don't return items posted by the current user (do this)
      this.props.history.push('/results');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="homepage">
        <div className="row">{this.renderButtons()}</div>

        <div className="row main-form">
          <div className="col-xs-12">
            <h2 className="title">find your grail.</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field name="term" component={this.renderSearchField} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.term) {
    errors.term = 'empty search term';
  }

  return errors;
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default reduxForm({ validate, form: 'SearchForm' })(
  connect(mapStateToProps, { fetchItems, fetchUser })(Home)
);
