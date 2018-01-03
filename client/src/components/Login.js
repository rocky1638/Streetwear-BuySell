import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

class Login extends Component {
  renderField(field) {
    return (
      <div className="form-group">
        <label className="form-label">{field.label}</label>
        <input className="form-control" type={field.type} {...field.input} />
        <div className="error-text">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="blurred-box col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3">
        <h2 className="form-header">Jump Back In</h2>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            type="text"
            label="Username"
            name="username"
            component={this.renderField}
          />
          <Field
            type="password"
            label="Password"
            name="password"
            component={this.renderField}
          />
          <button className="button button-success" type="submit">
            Login
          </button>
          <Link to="/" className="button button-right button-danger">
            Cancel
          </Link>
        </form>
        <div className="oauth-div">
          <a
            href="/auth/google"
            className="btn btn-social btn-block btn-google"
          >
            <FontAwesome class="fa fa-google" />
            Login With Google
          </a>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.username) {
    errors.username = 'Please enter your username.';
  }

  if (!values.password) {
    errors.password = 'Account with that username/password does not exist';
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'LoginForm'
})(Login);
