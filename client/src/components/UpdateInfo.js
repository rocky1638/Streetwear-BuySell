import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateUser } from '../actions';
import brands from '../data/brands';
import sizes from '../data/sizes';

class UpdateInfo extends Component {
  componentWillMount() {
    const { user } = this.props;
    const name = user.name ? user.name : '';
    const favoriteBrand = user.favoriteBrand ? user.favoriteBrand : '';
    const size = user.size ? user.size : '';
    const shoeSize = user.shoeSize ? user.shoeSize : '';
    const pantWaist = user.pantWaist ? user.pantWaist : '';
    const pantInseam = user.pantInseam ? user.pantInseam : '';

    this.props.initialize({
      name: name,
      favoriteBrand: favoriteBrand,
      size: size,
      shoeSize: shoeSize,
      pantWaist: pantWaist,
      pantInseam: pantInseam
    });
  }

  componentDidMount() {
    document.body.className = 'white';
  }

  renderField(field) {
    return (
      <div className="form-group">
        <label className="form-label">{field.label}</label>
        <input
          className="form-control"
          type={field.type}
          {...field.input}
          min={field.min}
          max={field.max}
          step={field.step}
        />
      </div>
    );
  }

  renderBrandDropdown(field) {
    function renderOptions(options) {
      return options.map(choice => (
        <option key={choice} value={choice}>
          {choice}
        </option>
      ));
    }

    return (
      <div className="form-group">
        <label className="form-label">{field.label}</label>
        <select className="form-control" type={field.type} {...field.input}>
          <option />
          {renderOptions(brands)}
        </select>
      </div>
    );
  }

  renderSizeDropdown(field) {
    function renderOptions(options) {
      return options.map(choice => (
        <option className="dropdown-content" key={choice} value={choice}>
          {choice}
        </option>
      ));
    }

    return (
      <div className="form-group">
        <label className="form-label">{field.label}</label>
        <select className="form-control" type={field.type} {...field.input}>
          <option />
          {renderOptions(sizes)}
        </select>
      </div>
    );
  }

  onSubmit(values) {
    console.log(values);
    this.props.updateUser(values, () => this.props.history.push('/profile'));
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="blurred-box col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3">
        <h2 className="form-header">Update Your Info</h2>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            type="text"
            label="Name"
            name="name"
            component={this.renderField}
          />
          <Field
            type="email"
            label="Email Address"
            name="email"
            component={this.renderField}
          />
          <Field
            type="text"
            label="Favorite Brand"
            name="favoriteBrand"
            component={this.renderBrandDropdown}
          />
          <Field
            type="text"
            label="Clothing Size"
            name="size"
            component={this.renderSizeDropdown}
          />
          <Field
            type="number"
            label="Shoe Size"
            name="shoeSize"
            min="3"
            max="15"
            step="0.5"
            component={this.renderField}
          />
          <Field
            type="number"
            label="Waist Size (inches)"
            name="pantWaist"
            min="24"
            max="46"
            step="1"
            component={this.renderField}
          />
          <Field
            type="number"
            label="Inseam Length (inches)"
            name="pantInseam"
            min="24"
            max="46"
            step="1"
            component={this.renderField}
          />

          <button className="button button-success" type="submit">
            Continue
          </button>
          <Link className="button button-danger button-right" to="/profile">
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth
  };
}

export default reduxForm({
  form: 'UpdateInfoForm'
})(connect(mapStateToProps, { updateUser })(UpdateInfo));
