import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import brands from '../data/brands';
import { addListing } from '../actions';

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

const FileInput = ({
  input: { value: omitValue, onChange, onBlur, ...inputProps },
  meta: omitMeta,
  ...props
}) => (
  <input
    onChange={adaptFileEventToValue(onChange)}
    onBlur={adaptFileEventToValue(onBlur)}
    type="file"
    {...inputProps}
    {...props}
  />
);

class AddListing extends Component {
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

  // renderImageField(field) {
  //   return (
  //     <div className="form-group">
  //       <label className="form-label">{field.label}</label>
  //       <input className="image-input" type={field.type} name={field.name} />
  //     </div>
  //   );
  // }

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

  onSubmit(values) {
    console.log(values.listingPicture);
    this.props.addListing(values, () => {
      this.props.history.push('/profile');
    });
  }

  render() {
    const { handleSubmit } = this.props;
    console.log('items: ', this.props.items);

    return (
      <div className="blurred-box col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3">
        <h2 className="form-header">Add A Listing</h2>
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit(this.onSubmit.bind(this))}
        >
          <Field
            type="text"
            label="Brand"
            name="brand"
            component={this.renderBrandDropdown}
          />
          <Field
            type="number"
            label="Price (CAD)"
            name="price"
            component={this.renderField}
          />
          <Field name="listingPicture" component={FileInput} />
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
    items: state.items
  };
}

export default reduxForm({
  form: 'AddListingForm'
})(connect(mapStateToProps, { addListing })(AddListing));
